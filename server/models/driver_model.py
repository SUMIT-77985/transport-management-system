# Simple driver model

drivers = []

class Driver:
    def __init__(self, name, license_number):
        self.id = len(drivers) + 1
        self.name = name
        self.license_number = license_number

    def to_dict(self):
        return {"id": self.id, "name": self.name, "license_number": self.license_number}
