from pymongo import MongoClient
from config import MONGO_URI

client = MongoClient(MONGO_URI)
db = client["DonorConnect"]  
users_collection = db["users"]
donors_collection = db["donors"]
requests_collection = db["requests"]
