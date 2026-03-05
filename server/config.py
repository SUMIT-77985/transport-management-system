from dotenv import load_dotenv
import os

load_dotenv()

SECRET_KEY = os.getenv('SECRET_KEY', 'change-me')
JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', SECRET_KEY)
MONGO_URI = os.getenv('MONGO_URI', 'mongodb://localhost:27017/transportdb')
