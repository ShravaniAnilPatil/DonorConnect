from flask import Blueprint, request, jsonify
from database import donors_collection, users_collection  
from models.donor import Donor  
from werkzeug.security import generate_password_hash, check_password_hash

import random
import smtplib
from email.message import EmailMessage
donor_routes = Blueprint("donor_routes", __name__)


otp_store = {}  

def send_otp(email, otp):
    """Send OTP to the user's email"""
    try:
        msg = EmailMessage()
        msg.set_content(f"Your OTP for Donor Registration is: {otp}")
        msg["Subject"] = "OTP for Blood Donor Signup"
        msg["From"] = "shravanipatil1625@gmail.com"   # replace with your email
        msg["To"] = email

        with smtplib.SMTP("smtp.gmail.com", 587) as smtp:
            smtp.starttls()
            smtp.login("shravanipatil1625@gmail.com", "iygt yror mult fkjb")  # use app password
            smtp.send_message(msg)

        return True
    except Exception as e:
        print("Email send failed:", e)
        return False

@donor_routes.route("/request-otp", methods=["POST"])
def request_otp():
    data = request.json
    email = data.get("email")

    if not email:
        return jsonify({"error": "Email is required"}), 400

    if donors_collection.find_one({"email": email}) or users_collection.find_one({"email": email}):
        return jsonify({"error": "Email already registered"}), 400

    otp = str(random.randint(100000, 999999))
    otp_store[email] = otp

    if send_otp(email, otp):
        return jsonify({"message": "OTP sent to your email", "success": True}), 200
    else:
        return jsonify({"error": "Failed to send OTP"}), 500

# Add this endpoint to match what the frontend is expecting
@donor_routes.route("/verify-otp", methods=["POST"])
def verify_otp():
    data = request.json
    email = data.get("email")
    entered_otp = data.get("otp")
    
    if not email or not entered_otp:
        return jsonify({"error": "Email and OTP are required"}), 400
        
    if email not in otp_store or otp_store[email] != entered_otp:
        return jsonify({"error": "Invalid or expired OTP"}), 401
    
    # Remove the password and confirmPassword from data before passing to register
    donor_data = {k: v for k, v in data.items() if k != 'confirmPassword'}
    
    # Register the donor
    try:
        if donors_collection.find_one({"email": email}) or users_collection.find_one({"email": email}):
            return jsonify({"error": "Email already registered"}), 400

        if donors_collection.find_one({"contact": data.get("contact")}):
            return jsonify({"error": "Contact number already registered"}), 400

        hashed_password = generate_password_hash(data.get("password"))

        new_donor = Donor(
            name=data.get("name"),
            email=email,
            age=data.get("age"),
            blood_group=data.get("blood_group"),
            contact=data.get("contact"),
            location=data.get("location"),
            last_donation_date=data.get("last_donation_date"),
            availability=data.get("availability", True),
            password=hashed_password
        )

        donors_collection.insert_one(new_donor.to_dict())
        otp_store.pop(email, None)  # Remove used OTP
        
        return jsonify({"message": "Donor registered successfully", "success": True}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@donor_routes.route("/register", methods=["POST"])
def add_donor():
    data = request.json

    required_fields = ["name", "email", "age", "blood_group", "contact", "location", "last_donation_date", "password", "otp"]
    missing = [field for field in required_fields if field not in data]

    if missing:
        return jsonify({"error": f"Missing fields: {', '.join(missing)}"}), 400

    email = data["email"]
    entered_otp = data["otp"]

    if email not in otp_store or otp_store[email] != entered_otp:
        return jsonify({"error": "Invalid or expired OTP"}), 401

    if donors_collection.find_one({"email": email}) or users_collection.find_one({"email": email}):
        return jsonify({"error": "Email already registered"}), 400

    if donors_collection.find_one({"contact": data["contact"]}):
        return jsonify({"error": "Contact number already registered"}), 400

    hashed_password = generate_password_hash(data["password"])

    new_donor = Donor(
        name=data["name"],
        email=email,
        age=data["age"],
        blood_group=data["blood_group"],
        contact=data["contact"],
        location=data["location"],
        last_donation_date=data["last_donation_date"],
        availability=data.get("availability", True),
        password=hashed_password
    )

    donors_collection.insert_one(new_donor.to_dict())

    otp_store.pop(email, None)  # Remove used OTP

    return jsonify({"message": "Donor registered successfully"}), 201

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