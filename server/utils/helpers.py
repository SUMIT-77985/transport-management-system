from flask import request

# simple helper for reading JSON body safely

def get_json():
    try:
        return request.get_json(force=True)
    except Exception:
        return {}
