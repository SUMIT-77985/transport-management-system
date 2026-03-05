from flask import Blueprint, request, jsonify
from middleware.auth_middleware import role_required
from db import mongo
from bson.objectid import ObjectId

driver_bp = Blueprint('driver', __name__, url_prefix='/api/drivers')


@driver_bp.route('', methods=['GET'])
def list_drivers():
    docs = list(mongo.db.drivers.find())
    for d in docs:
        d['_id'] = str(d['_id'])
    return jsonify(docs)


@driver_bp.route('', methods=['POST'])
@role_required('admin')
def create_driver():
    data = request.get_json() or {}
    if not data or 'name' not in data or 'license_number' not in data or 'phone' not in data:
        return jsonify({'error': 'name, license_number and phone required'}), 400
    doc = {
        'name': data['name'],
        'license_number': data['license_number'],
        'phone': data['phone'],
        'assigned_vehicle': data.get('assigned_vehicle')
    }
    res = mongo.db.drivers.insert_one(doc)
    doc['_id'] = str(res.inserted_id)
    return jsonify(doc), 201


@driver_bp.route('/<driver_id>/status', methods=['PATCH'])
@role_required('driver')
def update_status(driver_id):
    data = request.get_json() or {}
    status = data.get('status')
    if status is None:
        return jsonify({'error': 'status required'}), 400
    # store status in drivers collection under `status`
    updated = mongo.db.drivers.find_one_and_update({'_id': ObjectId(driver_id)}, {'$set': {'status': status}})
    return jsonify({'driver_id': driver_id, 'status': status}), 200
