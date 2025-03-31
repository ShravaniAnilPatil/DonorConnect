import os
from dotenv import load_dotenv

load_dotenv()
MONGO_URI = os.getenv("MONGO_URI", "mongodb+srv://Shravani:Shweta2509@cluster0.idtt1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

FLASK_ENV = os.getenv("FLASK_ENV", "production")
FLASK_DEBUG = os.getenv("FLASK_DEBUG", "False") == "True"


