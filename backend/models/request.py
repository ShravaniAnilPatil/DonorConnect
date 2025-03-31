from bson import ObjectId

class BloodRequest:
    def __init__(self, user_id, patient_name, blood_group, hospital_name, location, status="pending"):
        self.user_id = ObjectId(user_id)
        self.patient_name = patient_name
        self.blood_group = blood_group
        self.hospital_name = hospital_name
        self.location = location
        self.status = status

    def to_dict(self):
        return {
            "user_id": str(self.user_id), 
            "patient_name": self.patient_name,
            "blood_group": self.blood_group,
            "hospital_name": self.hospital_name,
            "location": self.location,
            "status": self.status
        }
