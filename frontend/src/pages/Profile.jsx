import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        
        if (!user || !user.email) {
          navigate("/login");
          return;
        }
        
        const endpoint = user.userType === "donor" 
          ? "/donors/profile" 
          : "/users/profile";
        
        const response = await axios.post(`http://localhost:5000/api${endpoint}`, {
          email: user.email
        });
        
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        alert("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem("user");
      navigate("/login");
    }
  };
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading profile...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-red-600">User Profile</h1>
          <button
            onClick={handleLogout}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>

        {userData ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="text-gray-500 text-sm">Name</h3>
                <p className="font-medium">{userData.name}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="text-gray-500 text-sm">Email</h3>
                <p className="font-medium">{userData.email}</p>
              </div>
              {userData.blood_group && (
                <div className="bg-gray-50 p-4 rounded">
                  <h3 className="text-gray-500 text-sm">Blood Group</h3>
                  <p className="font-medium">{userData.blood_group}</p>
                </div>
              )}
              {userData.contact && (
                <div className="bg-gray-50 p-4 rounded">
                  <h3 className="text-gray-500 text-sm">Contact</h3>
                  <p className="font-medium">{userData.contact}</p>
                </div>
              )}
              {userData.location && (
                <div className="bg-gray-50 p-4 rounded">
                  <h3 className="text-gray-500 text-sm">Location</h3>
                  <p className="font-medium">{userData.location}</p>
                </div>
              )}
              {userData.age && (
                <div className="bg-gray-50 p-4 rounded">
                  <h3 className="text-gray-500 text-sm">Age</h3>
                  <p className="font-medium">{userData.age}</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">No profile data available</p>
        )}
      </div>
    </div>
  );
};

export default Profile;