# Simple booking model

bookings = []

class Booking:
    def __init__(self, user_id, vehicle_id, start_date, end_date):
        self.id = len(bookings) + 1
        self.user_id = user_id
        self.vehicle_id = vehicle_id
        self.start_date = start_date
        self.end_date = end_date

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "vehicle_id": self.vehicle_id,
            "start_date": self.start_date,
            "end_date": self.end_date,
        }
