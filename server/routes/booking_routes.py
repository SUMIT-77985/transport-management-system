from flask import Blueprint, request, jsonify
from middleware.auth_middleware import role_required
from flask_jwt_extended import get_jwt_identity
from db import mongo
from bson.objectid import ObjectId

booking_bp = Blueprint('booking', __name__, url_prefix='/api/bookings')


@booking_bp.route('', methods=['GET'])
def list_bookings():
    # return bookings for current user only
    try:
        # require auth and get identity
        from flask_jwt_extended import verify_jwt_in_request, get_jwt
        verify_jwt_in_request()
        identity = get_jwt_identity()
        claims = get_jwt()
    except Exception:
        return jsonify({'error': 'authorization required'}), 401
    role = claims.get('role')
    if role == 'admin':
        docs = list(mongo.db.bookings.find())
    else:
        docs = list(mongo.db.bookings.find({'user_id': identity}))
    for d in docs:
        d['_id'] = str(d['_id'])
    return jsonify(docs)


@booking_bp.route('', methods=['POST'])
@role_required('user')
def create_booking():
    data = request.get_json() or {}
    user_id = get_jwt_identity()
    required = {'vehicle_id', 'pickup_location', 'drop_location', 'booking_date'}
    if not required.issubset(data.keys()):
        return jsonify({'error': 'missing booking data'}), 400
    
    # validate vehicle exists and is available
    try:
        vehicle = mongo.db.vehicles.find_one({'_id': ObjectId(data['vehicle_id'])})
    except Exception:
        return jsonify({'error': 'invalid vehicle_id'}), 400
    if not vehicle:
        return jsonify({'error': 'vehicle not found'}), 404
    if vehicle.get('status') != 'available':
        return jsonify({'error': 'vehicle not available'}), 400
    
    doc = {
        'user_id': user_id,
        'vehicle_id': data['vehicle_id'],
        'pickup_location': data['pickup_location'],
        'drop_location': data['drop_location'],
        'booking_date': data['booking_date'],
        'status': data.get('status', 'pending'),
        'trip_status': 'pending'  # trip status: pending, on_route, completed
    }
    res = mongo.db.bookings.insert_one(doc)
    doc['_id'] = str(res.inserted_id)
    return jsonify(doc), 201


@booking_bp.route('/<booking_id>/trip-status', methods=['PATCH'])
@role_required('driver')
def update_trip_status(booking_id):
    data = request.get_json() or {}
    trip_status = data.get('trip_status')
    valid_statuses = ['pending', 'on_route', 'completed']
    if not trip_status or trip_status not in valid_statuses:
        return jsonify({'error': f'trip_status must be one of {valid_statuses}'}), 400
    try:
        res = mongo.db.bookings.update_one({'_id': ObjectId(booking_id)}, {'$set': {'trip_status': trip_status}})
    except Exception:
        return jsonify({'error': 'invalid id'}), 400
    if res.matched_count == 0:
        return jsonify({'error': 'not found'}), 404
    doc = mongo.db.bookings.find_one({'_id': ObjectId(booking_id)})
    doc['_id'] = str(doc['_id'])
    return jsonify(doc)


@booking_bp.route('/<booking_id>', methods=['PATCH'])
@role_required('driver')
def update_booking_status(booking_id):
    data = request.get_json() or {}
    status = data.get('status')
    if not status:
        return jsonify({'error': 'status required'}), 400
    try:
        res = mongo.db.bookings.update_one({'_id': ObjectId(booking_id)}, {'$set': {'status': status}})
    except Exception:
        return jsonify({'error': 'invalid id'}), 400
    if res.matched_count == 0:
        return jsonify({'error': 'not found'}), 404
    doc = mongo.db.bookings.find_one({'_id': ObjectId(booking_id)})
    doc['_id'] = str(doc['_id'])
    return jsonify(doc)


@booking_bp.route('/<booking_id>', methods=['DELETE'])
@role_required('user')
def cancel_booking(booking_id):
    # users can cancel their own bookings; admin can cancel any
    from flask_jwt_extended import get_jwt_identity, get_jwt
    identity = get_jwt_identity()
    claims = get_jwt()
    role = claims.get('role')
    try:
        booking = mongo.db.bookings.find_one({'_id': ObjectId(booking_id)})
    except Exception:
        return jsonify({'error': 'invalid id'}), 400
    if not booking:
        return jsonify({'error': 'not found'}), 404
    if role != 'admin' and booking.get('user_id') != identity:
        return jsonify({'error': 'forbidden'}), 403
    mongo.db.bookings.update_one({'_id': ObjectId(booking_id)}, {'$set': {'status': 'cancelled'}})
    return ('', 204)
