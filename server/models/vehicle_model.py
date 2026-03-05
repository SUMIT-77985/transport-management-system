# Simple in-memory vehicle storage

vehicles = []

class Vehicle:
    def __init__(self, make, model):
        self.id = len(vehicles) + 1
        self.make = make
        self.model = model

    def to_dict(self):
        return {"id": self.id, "make": self.make, "model": self.model}
