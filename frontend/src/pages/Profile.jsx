import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaTint,
  FaMapMarkerAlt,
  FaSignOutAlt,
} from "react-icons/fa";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    
    if (!storedUser?.email || !storedUser?.userType) {
      navigate("/login");
      return;
    }
  
    const apiRoute =
      storedUser.userType === "donor"
        ? "http://localhost:5000/api/donors/profile"
        : "http://localhost:5000/api/users/profile";
  
    axios
      .post(apiRoute, { email: storedUser.email })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.error("Error fetching user profile:", err);
      });
  }, [navigate]);
  
  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (confirmed) {
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  if (!user) {
    return (
      <div className="text-center mt-20 text-gray-600 text-xl animate-pulse">
        Loading profile...
      </div>
    );
  }

  const userType = JSON.parse(localStorage.getItem("user"))?.userType || "User";
  const profileTitle =
    userType === "requestor" ? "🧾 Requestor Profile" : "🩸 Donor Profile";

  return (
    <div className="max-w-xl mx-auto mt-16 bg-gradient-to-br from-red-50 to-white shadow-2xl rounded-3xl p-8">
      <h2 className="text-3xl font-extrabold text-center text-red-700 mb-6">
        {profileTitle}
      </h2>
      <div className="space-y-4 text-gray-700 text-lg">
        <p className="flex items-center gap-3">
          <FaUser className="text-red-500" /> <strong>Name:</strong> {user.name}
        </p>
        <p className="flex items-center gap-3">
          <FaEnvelope className="text-red-500" /> <strong>Email:</strong>{" "}
          {user.email}
        </p>
        <p className="flex items-center gap-3">
          <FaPhone className="text-red-500" /> <strong>Phone:</strong>{" "}
          {user.phone}
        </p>
        <p className="flex items-center gap-3">
          <FaTint className="text-red-500" /> <strong>Blood Group:</strong>{" "}
          {user.blood_group}
        </p>
        <p className="flex items-center gap-3">
          <FaMapMarkerAlt className="text-red-500" /> <strong>Location:</strong>{" "}
          {user.location}
        </p>
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full shadow-md transition-all flex items-center justify-center gap-2"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
