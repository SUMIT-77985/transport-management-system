from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
import config
from db import mongo

# import blueprints from routes
from routes.auth_routes import auth_bp
from routes.vehicle_routes import vehicle_bp
from routes.booking_routes import booking_bp
from routes.driver_routes import driver_bp
from routes.admin_routes import admin_bp

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = config.JWT_SECRET_KEY
app.config['MONGO_URI'] = config.MONGO_URI
CORS(app)  # allow cross-origin requests from the frontend
JWTManager(app)

# initialize PyMongo
mongo.init_app(app)

# register blueprints
app.register_blueprint(auth_bp)
app.register_blueprint(vehicle_bp)
app.register_blueprint(booking_bp)
app.register_blueprint(driver_bp)
app.register_blueprint(admin_bp)


@app.route("/", methods=["GET"])
def home():
    return "Server Working"


@app.route("/api/health", methods=["GET"])
def health():
    return {"status": "ok"}


if __name__ == "__main__":
    app.run(debug=True)
