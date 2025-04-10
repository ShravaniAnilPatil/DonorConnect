from flask import Blueprint, request, jsonify
from database import donors_collection, users_collection  
from models.donor import Donor  
from werkzeug.security import generate_password_hash, check_password_hash


donor_routes = Blueprint("donor_routes", __name__)

@donor_routes.route("/register", methods=["POST"])
def add_donor():
    """Register a new donor"""
    data = request.json

    required_fields = ["name", "email", "age", "blood_group", "contact", "location", "last_donation_date"]
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Missing required fields"}), 400

    if donors_collection.find_one({"email": data["email"]}) or users_collection.find_one({"email": data["email"]}):
        return jsonify({"error": "Email already registered"}), 400
    
    if donors_collection.find_one({"contact": data["contact"]}):
        return jsonify({"error": "Contact number already registered"}), 400

    hashed_password = generate_password_hash(data["password"]) if "password" in data else None

    new_donor = Donor(
        name=data["name"],
        email=data["email"],
        age=data["age"],
        blood_group=data["blood_group"],
        contact=data["contact"],
        location=data["location"],
        last_donation_date=data["last_donation_date"],
        availability=data.get("availability", True),
        password=hashed_password 
    )

    donors_collection.insert_one(new_donor.to_dict())

    return jsonify({"message": "Donor added successfully"}), 201


@donor_routes.route("/all", methods=["GET"])
def get_donors():
    donors = list(donors_collection.find({}, {"_id": 0}))
    return jsonify(donors), 200

@donor_routes.route("/<blood_group>", methods=["GET"])
def get_donors_by_blood_group(blood_group):
    donors = list(donors_collection.find({"blood_group": blood_group, "availability": True}, {"_id": 0}))
    return jsonify(donors), 200

@donor_routes.route("/donors/<name>/availability", methods=["PUT"])
def update_donor_availability(name):
    data = request.json
    result = donors_collection.update_one({"name": name}, {"$set": {"availability": data["availability"]}})
    if result.modified_count > 0:
        return jsonify({"message": "Donor availability updated"}), 200
    return jsonify({"error": "Donor not found"}), 404

@donor_routes.route("/login", methods=["POST"])
def login():
    data = request.json
    donor = donors_collection.find_one({"email": data["email"]})

    if donor:
        stored_password_hash = donor["password"] 
        entered_password = data["password"] 
        
        if check_password_hash(stored_password_hash, entered_password):
            return jsonify({"message": "Login successful", "user_type": donor.get("user_type", "donor")}), 200

    return jsonify({"error": "Invalid email or password"}), 401

@donor_routes.route("/profile", methods=["POST"])
def get_donor_profile():
    """Get donor profile by email"""
    data = request.json
    email = data.get("email")
    if not email:
        return jsonify({"error": "Email required"}), 400

    donor = donors_collection.find_one({"email": email}, {"_id": 0, "password": 0})
    if not donor:
        return jsonify({"error": "Donor not found"}), 404

    return jsonify(donor), 200
