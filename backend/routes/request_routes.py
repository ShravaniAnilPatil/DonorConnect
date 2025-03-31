from flask import Blueprint, request, jsonify
from database import requests_collection, users_collection
from models.request import BloodRequest
from bson import ObjectId

request_routes = Blueprint("request_routes", __name__)

@request_routes.route("/requests", methods=["POST"])
def create_request():
    data = request.json
    user = users_collection.find_one({"_id": ObjectId(data["user_id"])})  
    
    if not user:
        return jsonify({"error": "Invalid requestor ID"}), 400

    new_request = BloodRequest(
        data["user_id"], data["patient_name"], data["blood_group"], 
        data["hospital_name"], data["location"]
    )

    requests_collection.insert_one(new_request.to_dict())
    return jsonify({"message": "Blood request added successfully"}), 201

@request_routes.route("/requests", methods=["GET"])
def get_requests():
    requests = []
    for request_data in requests_collection.find(): 
        requests.append(BloodRequest(**request_data))
    return jsonify({"requests": [request.to_dict() for request in requests]}), 200

@request_routes.route("/requests/user/<user_id>", methods=["GET"])
def get_requests_by_user(user_id):
    requests = list(requests_collection.find({"user_id": ObjectId(user_id)}, {"_id": 0}))
    return jsonify(requests), 200

@request_routes.route("/requests/<request_id>/status", methods=["PUT"])
def update_request_status(request_id):
    data = request.json
    result = requests_collection.update_one({"_id": ObjectId(request_id)}, {"$set": {"status": data["status"]}})
    
    if result.modified_count > 0:
        return jsonify({"message": "Request status updated"}), 200
    return jsonify({"error": "Request not found"}), 404
