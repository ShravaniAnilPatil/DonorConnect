from werkzeug.security import generate_password_hash, check_password_hash

class Donor:
    def __init__(self, name, email, age, blood_group, contact, location, last_donation_date, availability=True, password=None):
        self.name = name
        self.email = email
        self.age = age
        self.blood_group = blood_group
        self.contact = contact
        self.location = location
        self.last_donation_date = last_donation_date
        self.availability = availability
        self.password = password 

    def to_dict(self):
        return {
            "name": self.name,
            "email": self.email,
            "age": self.age,
            "blood_group": self.blood_group,
            "contact": self.contact,
            "location": self.location,
            "last_donation_date": self.last_donation_date,
            "availability": self.availability,
            "password": self.password 
        }
    
    def check_password(self, password):
        """Verify password (if authentication is enabled)"""
        return check_password_hash(self.password, password) if self.password else False

    def set_password(self, password):
        self.password = generate_password_hash(password)