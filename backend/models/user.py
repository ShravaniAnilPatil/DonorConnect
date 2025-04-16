import re
from werkzeug.security import generate_password_hash, check_password_hash

class User:
    def __init__(self, name, email, phone, password, blood_group, location):
        # Validate phone number (must be 10 digits and start with 7, 8, or 9)
        if not re.match(r'^[789]\d{9}$', phone):
            raise ValueError("Phone number must be 10 digits and start with 7, 8, or 9.")
        
        # Initialize user attributes
        self.name = name
        self.email = email
        self.phone = phone
        self.password = generate_password_hash(password)  
        self.blood_group = blood_group
        self.location = location 

    def to_dict(self):
        return {
            "name": self.name,
            "email": self.email,
            "phone": self.phone,
            "password": self.password, 
            "blood_group": self.blood_group,
            "location": self.location
        }

    def check_password(self, password):
        """Check if the entered password matches the stored hashed password."""
        return check_password_hash(self.password, password)

    def set_password(self, password):
        """Set a new password with hashing."""
        self.password = generate_password_hash(password)