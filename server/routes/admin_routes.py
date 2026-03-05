from flask import Blueprint, jsonify
from middleware.auth_middleware import role_required
from db import mongo

admin_bp = Blueprint('admin', __name__, url_prefix='/api/admin')


@admin_bp.route('/dashboard', methods=['GET'])
@role_required('admin')
def dashboard_stats():
    """Return dashboard stats: total vehicles, bookings, active trips"""
    total_vehicles = mongo.db.vehicles.count_documents({})
    total_bookings = mongo.db.bookings.count_documents({})
    active_trips = mongo.db.bookings.count_documents({'trip_status': 'on_route'})
    
    # vehicles by status
    available_vehicles = mongo.db.vehicles.count_documents({'status': 'available'})
    booked_vehicles = mongo.db.vehicles.count_documents({'status': 'booked'})
    
    # bookings by status
    pending_bookings = mongo.db.bookings.count_documents({'status': 'pending'})
    completed_bookings = mongo.db.bookings.count_documents({'status': 'completed'})
    cancelled_bookings = mongo.db.bookings.count_documents({'status': 'cancelled'})
    
    return jsonify({
        'vehicles': {
            'total': total_vehicles,
            'available': available_vehicles,
            'booked': booked_vehicles
        },
        'bookings': {
            'total': total_bookings,
            'pending': pending_bookings,
            'completed': completed_bookings,
            'cancelled': cancelled_bookings
        },
        'trips': {
            'active': active_trips
        }
    })


@admin_bp.route('/bookings', methods=['GET'])
def list_all_bookings():
    """Return all bookings (public endpoint for dashboard)"""
    docs = list(mongo.db.bookings.find())
    for d in docs:
        d['_id'] = str(d['_id'])
    return jsonify(docs)
