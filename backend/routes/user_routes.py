from flask import Blueprint, request, jsonify
from database import users_collection
from models.user import User

user_routes = Blueprint("user_routes", __name__)

@user_routes.route("/register", methods=["POST"])
def register():
    data = request.json
    existing_user = users_collection.find_one({"email": data["email"]})
    
    if existing_user:
        return jsonify({"error": "Email already registered"}), 400

    new_user = User(data["name"], data["email"], data["phone"], data["password"], data["blood_group"], data["location"])
    users_collection.insert_one(new_user.to_dict())

    return jsonify({"message": "User registered successfully"}), 201

from werkzeug.security import check_password_hash

@user_routes.route("/login", methods=["POST"])
def login():
    data = request.json
    user = users_collection.find_one({"email": data["email"]})

    if user:
        stored_password_hash = user["password"] 
        entered_password = data["password"] 
        
        if check_password_hash(stored_password_hash, entered_password):
            return jsonify({"message": "Login successful", "user_type": user.get("user_type", "requestor")}), 200

    return jsonify({"error": "Invalid email or password"}), 401
