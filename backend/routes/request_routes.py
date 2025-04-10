from flask import Blueprint, request, jsonify
from database import requests_collection, users_collection
from models.request import BloodRequest
from bson import ObjectId

request_routes = Blueprint("request_routes", __name__)

@request_routes.route("/add", methods=["POST"])
def create_request():
    """Create a new blood request using email instead of user ID"""
    data = request.json

    required_fields = ["email", "patient_name", "blood_group", "hospital_name", "location"]
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Missing required fields"}), 400
    user = users_collection.find_one({"email": data["email"]})
    if not user:
        return jsonify({"error": "No user found with this email"}), 400
    new_request = BloodRequest(
        email=data["email"],
        patient_name=data["patient_name"],
        blood_group=data["blood_group"],
        hospital_name=data["hospital_name"],
        location=data["location"],
        status="pending"  
    )

    requests_collection.insert_one(new_request.to_dict())
    return jsonify({"message": "Blood request added successfully"}), 201

@request_routes.route("/find", methods=["GET"])
def get_requests():
    """Fetch all blood requests"""
    requests = []
    for request_data in requests_collection.find(): 
        request_obj = BloodRequest(
            email=request_data["email"],
            patient_name=request_data["patient_name"],
            blood_group=request_data["blood_group"],
            hospital_name=request_data["hospital_name"],
            location=request_data["location"],
            status=request_data.get("status", "pending")
        )
        requests.append(request_obj.to_dict())
    
    return jsonify({"requests": requests}), 200

@request_routes.route("/user/<email>", methods=["GET"])
def get_requests_by_user(email):
    """Fetch blood requests by user email"""
    requests = list(requests_collection.find({"email": email}, {"_id": 0}))
    if not requests:
        return jsonify({"error": "No requests found for this email"}), 404
    return jsonify(requests), 200

@request_routes.route("/<request_id>/status", methods=["PUT"])
def update_request_status(request_id):
    """Update the status of a blood request"""
    data = request.json

    if "status" not in data:
        return jsonify({"error": "Missing status field"}), 400
    try:
        object_id = ObjectId(request_id)
    except:
        return jsonify({"error": "Invalid request_id format"}), 400

    request_exists = requests_collection.find_one({"_id": object_id})

    if not request_exists:
        return jsonify({"error": "Request not found"}), 404
    requests_collection.update_one({"_id": object_id}, {"$set": {"status": data["status"]}})
    return jsonify({"message": "Request status updated successfully"}), 200

@request_routes.route("/requests-for-donor/<email>", methods=["GET"])
def get_requests_for_donor(email):
    """Fetch all blood requests sent to a particular donor's email"""
    requests = requests_collection.find({"email": email})
    result = []

    for req in requests:
        req["_id"] = str(req["_id"])
        result.append(req)

    return jsonify(result), 200

@request_routes.route("/find/<blood_group>", methods=["GET"])
def get_requests_by_blood_group(blood_group):
    """Fetch all blood requests for a specific blood group"""
    try:
        matching_requests = []
        for request_data in requests_collection.find({"blood_group": blood_group.upper()}):
            request_obj = BloodRequest(
                email=request_data["email"],
                patient_name=request_data["patient_name"],
                blood_group=request_data["blood_group"],
                hospital_name=request_data["hospital_name"],
                location=request_data["location"],
                status=request_data.get("status", "pending")
            )
            request_dict = request_obj.to_dict()
            request_dict["_id"] = str(request_data["_id"])  
            matching_requests.append(request_dict)

        return jsonify({"requests": matching_requests}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


    except Exception as e:
        return jsonify({"error": "Failed to fetch requests", "details": str(e)}), 500
