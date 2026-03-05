from app import app
from db import mongo
from werkzeug.security import generate_password_hash
from datetime import datetime, timedelta

with app.app_context():
    # Check if vehicles exist
    vehicle_count = mongo.db.vehicles.count_documents({})
    print(f"Current vehicles: {vehicle_count}")
    
    # Add sample vehicles
    if vehicle_count == 0:
        vehicles = [
            {
                'vehicle_number': 'TN-01-AB-1234',
                'vehicle_type': 'car',
                'capacity': 4,
                'status': 'available'
            },
            {
                'vehicle_number': 'TN-01-CD-5678',
                'vehicle_type': 'car',
                'capacity': 4,
                'status': 'available'
            },
            {
                'vehicle_number': 'TN-01-EF-9012',
                'vehicle_type': 'truck',
                'capacity': 10,
                'status': 'available'
            },
            {
                'vehicle_number': 'TN-01-GH-3456',
                'vehicle_type': 'van',
                'capacity': 6,
                'status': 'available'
            },
            {
                'vehicle_number': 'TN-01-IJ-7890',
                'vehicle_type': 'car',
                'capacity': 4,
                'status': 'booked'
            }
        ]
        mongo.db.vehicles.insert_many(vehicles)
        print("Added 5 sample vehicles")
    else:
        print("Vehicles already exist, skipping...")
    
    # Check if users exist
    user_count = mongo.db.users.count_documents({})
    print(f"Current users: {user_count}")
    
    # Add sample user if no users exist
    if user_count == 0:
        user = {
            'name': 'John Doe',
            'email': 'john@example.com',
            'password': generate_password_hash('password123'),
            'role': 'user'
        }
        result = mongo.db.users.insert_one(user)
        user_id = str(result.inserted_id)
        print(f"Added sample user: john@example.com / password123, ID: {user_id}")
    else:
        user = mongo.db.users.find_one({'email': 'john@example.com'})
        user_id = str(user['_id']) if user else None
        print("Users already exist, skipping...")
    
    # Check if bookings exist
    booking_count = mongo.db.bookings.count_documents({})
    print(f"Current bookings: {booking_count}")
    
    # Add sample bookings if no bookings exist
    if booking_count == 0:
        # Get the first user
        first_user = mongo.db.users.find_one()
        
        if first_user:
            user_id = str(first_user['_id'])
            # Get some vehicle IDs
            vehicles = list(mongo.db.vehicles.find({'status': 'available'}).limit(3))
            
            if vehicles:
                bookings = [
                    {
                        'user_id': user_id,
                        'vehicle_id': str(vehicles[0]['_id']),
                        'pickup_location': 'Chennai Central',
                        'drop_location': 'Bangalore City',
                        'booking_date': datetime.now().isoformat(),
                        'status': 'confirmed',
                        'trip_status': 'completed'
                    },
                    {
                        'user_id': user_id,
                        'vehicle_id': str(vehicles[1]['_id']) if len(vehicles) > 1 else str(vehicles[0]['_id']),
                        'pickup_location': 'Coimbatore',
                        'drop_location': 'Madurai',
                        'booking_date': (datetime.now() + timedelta(days=1)).isoformat(),
                        'status': 'pending',
                        'trip_status': 'pending'
                    },
                    {
                        'user_id': user_id,
                        'vehicle_id': str(vehicles[2]['_id']) if len(vehicles) > 2 else str(vehicles[0]['_id']),
                        'pickup_location': 'Hyderabad Airport',
                        'drop_location': 'Secunderabad',
                        'booking_date': (datetime.now() + timedelta(days=2)).isoformat(),
                        'status': 'confirmed',
                        'trip_status': 'on_route'
                    }
                ]
                mongo.db.bookings.insert_many(bookings)
                print("Added 3 sample bookings")
            else:
                print("No available vehicles to create bookings")
        else:
            print("No users found to create bookings")
    else:
        print("Bookings already exist, skipping...")
    
    # Print final counts
    print(f"\nFinal counts:")
    print(f"  Users: {mongo.db.users.count_documents({})}")
    print(f"  Vehicles: {mongo.db.vehicles.count_documents({})}")
    print(f"  Bookings: {mongo.db.bookings.count_documents({})}")

