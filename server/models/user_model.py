# Placeholder user model - in real app use a database/ORM

users = []  # in-memory "table"

class User:
    def __init__(self, username, password_hash, role='user'):
        self.id = len(users) + 1
        self.username = username
        self.password_hash = password_hash
        self.role = role

    def to_dict(self):
        return {"id": self.id, "username": self.username, "role": self.role}


def find_by_username(username):
    for u in users:
        if u.username == username:
            return u
    return None
