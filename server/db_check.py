from app import app
from db import mongo
import traceback

with app.app_context():
    try:
        db = mongo.cx.get_database()
        print('OK, collections:', db.list_collection_names()[:10])
    except Exception as e:
        print('DB ERROR:', e)
        traceback.print_exc()
