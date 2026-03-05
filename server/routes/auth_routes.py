from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from db import mongo
from bson.objectid import ObjectId

auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')


@auth_bp.route('/signup', methods=['POST'])
def signup():
    data = request.get_json() or {}
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    role = data.get('role', 'user')
    if not email or not password or not name:
        return jsonify({'error': 'name, email and password required'}), 400
    if mongo.db.users.find_one({'email': email}):
        return jsonify({'error': 'email already exists'}), 400
    pw_hash = generate_password_hash(password)
    res = mongo.db.users.insert_one({'name': name, 'email': email, 'password': pw_hash, 'role': role})
    user_id = str(res.inserted_id)
    access_token = create_access_token(identity=user_id, additional_claims={'role': role})
    user = mongo.db.users.find_one({'_id': ObjectId(user_id)})
    user['_id'] = str(user['_id'])
    user.pop('password', None)
    return jsonify({'user': user, 'access_token': access_token}), 201


@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json() or {}
    email = data.get('email')
    password = data.get('password')
    if not email or not password:
        return jsonify({'error': 'email and password required'}), 400
    user = mongo.db.users.find_one({'email': email})
    if not user or not check_password_hash(user.get('password', ''), password):
        return jsonify({'error': 'invalid credentials'}), 401
    user_id = str(user['_id'])
    access_token = create_access_token(identity=user_id, additional_claims={'role': user.get('role', 'user')})
    user['_id'] = str(user['_id'])
    user.pop('password', None)
    return jsonify({'user': user, 'access_token': access_token})
