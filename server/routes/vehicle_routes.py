from flask import Blueprint, request, jsonify
from middleware.auth_middleware import role_required
from db import mongo
from bson.objectid import ObjectId

vehicle_bp = Blueprint('vehicle', __name__, url_prefix='/api/vehicles')


@vehicle_bp.route('', methods=['GET'])
def list_vehicles():
    # pagination: page and limit
    page = request.args.get('page', 1, type=int)
    limit = request.args.get('limit', 10, type=int)
    skip = (page - 1) * limit
    
    # search by vehicle_type
    vehicle_type = request.args.get('vehicle_type')
    
    # filter by status (available/booked)
    status = request.args.get('status')
    
    # build query
    query = {}
    if vehicle_type:
        query['vehicle_type'] = {'$regex': vehicle_type, '$options': 'i'}  # case-insensitive
    if status:
        query['status'] = status
    
    total = mongo.db.vehicles.count_documents(query)
    docs = list(mongo.db.vehicles.find(query).skip(skip).limit(limit))
    for d in docs:
        d['_id'] = str(d['_id'])
    
    return jsonify({
        'data': docs,
        'total': total,
        'page': page,
        'limit': limit,
        'pages': (total + limit - 1) // limit
    })


@vehicle_bp.route('', methods=['POST'])
@role_required('admin')
def create_vehicle():
    data = request.get_json() or {}
    required = {'vehicle_number', 'vehicle_type', 'capacity'}
    if not required.issubset(data.keys()):
        return jsonify({'error': 'missing vehicle data'}), 400
    doc = {
        'vehicle_number': data['vehicle_number'],
        'vehicle_type': data['vehicle_type'],
        'capacity': data['capacity'],
        'status': data.get('status', 'available')
    }
    res = mongo.db.vehicles.insert_one(doc)
    doc['_id'] = str(res.inserted_id)
    return jsonify(doc), 201


@vehicle_bp.route('/<vehicle_id>', methods=['PUT'])
@role_required('admin')
def update_vehicle(vehicle_id):
    data = request.get_json() or {}
    allowed = {'vehicle_number', 'vehicle_type', 'capacity', 'status'}
    update = {k: v for k, v in data.items() if k in allowed}
    if not update:
        return jsonify({'error': 'no updatable fields provided'}), 400
    try:
        res = mongo.db.vehicles.update_one({'_id': ObjectId(vehicle_id)}, {'$set': update})
    except Exception:
        return jsonify({'error': 'invalid id'}), 400
    if res.matched_count == 0:
        return jsonify({'error': 'not found'}), 404
    doc = mongo.db.vehicles.find_one({'_id': ObjectId(vehicle_id)})
    doc['_id'] = str(doc['_id'])
    return jsonify(doc)


@vehicle_bp.route('/<vehicle_id>', methods=['DELETE'])
@role_required('admin')
def delete_vehicle(vehicle_id):
    try:
        res = mongo.db.vehicles.delete_one({'_id': ObjectId(vehicle_id)})
    except Exception:
        return jsonify({'error': 'invalid id'}), 400
    if res.deleted_count == 0:
        return jsonify({'error': 'not found'}), 404
    return ('', 204)
