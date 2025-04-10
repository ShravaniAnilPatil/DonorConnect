import React, { useEffect, useState } from "react";

const AllRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/requests/find");
        const data = await res.json();
        if (data.requests) {
          setRequests(data.requests);
        }
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center text-red-700 mb-6">
        All Blood Requests
      </h2>

      {requests.length > 0 ? (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4">
          {requests.map((req, index) => (
            <div key={index} className="bg-white shadow-md border rounded p-4">
              <p><strong>Patient Name:</strong> {req.patient_name}</p>
              <p><strong>Blood Group:</strong> {req.blood_group}</p>
              <p><strong>Hospital:</strong> {req.hospital_name}</p>
              <p><strong>Location:</strong> {req.location}</p>
              <p><strong>Requested By:</strong> {req.email}</p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={
                    req.status === "approved"
                      ? "text-green-600"
                      : req.status === "rejected"
                      ? "text-red-600"
                      : "text-yellow-500"
                  }
                >
                  {req.status}
                </span>
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No requests found.</p>
      )}
    </div>
  );
};

export default AllRequests;
