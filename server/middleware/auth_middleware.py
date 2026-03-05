from functools import wraps
from flask import jsonify
from flask_jwt_extended import verify_jwt_in_request, get_jwt


def jwt_required(fn):
    """Ensure a valid JWT is present."""
    @wraps(fn)
    def wrapper(*args, **kwargs):
        try:
            verify_jwt_in_request()
        except Exception:
            return jsonify({'error': 'Missing or invalid token'}), 401
        return fn(*args, **kwargs)
    return wrapper


def roles_required(*roles):
    """Require that the JWT contains one of the given roles. Admin bypasses checks."""
    def decorator(fn):
        @wraps(fn)
        def wrapper(*args, **kwargs):
            try:
                verify_jwt_in_request()
            except Exception:
                return jsonify({'error': 'Missing or invalid token'}), 401
            claims = get_jwt()
            user_role = claims.get('role')
            if user_role == 'admin':
                return fn(*args, **kwargs)
            if user_role not in roles:
                return jsonify({'error': 'forbidden'}), 403
            return fn(*args, **kwargs)
        return wrapper
    return decorator


def jwt_error_response(message, status_code=401):
    return jsonify({'error': message}), status_code


# back-compat alias used by routes
def role_required(role):
    return roles_required(role)
