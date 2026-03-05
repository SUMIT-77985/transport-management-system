import jwt
import datetime
from config import SECRET_KEY

# basic JWT helpers

def generate_token(payload, expires_in=3600):
    data = payload.copy()
    data['exp'] = datetime.datetime.utcnow() + datetime.timedelta(seconds=expires_in)
    return jwt.encode(data, SECRET_KEY, algorithm='HS256')


def decode_token(token):
    try:
        return jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None
