class BloodRequest:
    def __init__(self, email, patient_name, blood_group, hospital_name, location, status="pending"):
        self.email = email  
        self.patient_name = patient_name
        self.blood_group = blood_group
        self.hospital_name = hospital_name
        self.location = location
        self.status = status  

    def to_dict(self):
        return {
            "email": self.email,
            "patient_name": self.patient_name,
            "blood_group": self.blood_group,
            "hospital_name": self.hospital_name,
            "location": self.location,
            "status": self.status
        }
