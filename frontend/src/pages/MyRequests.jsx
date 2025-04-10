import { useEffect, useState } from "react";

const MyRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("myRequests");
    if (stored) {
      setRequests(JSON.parse(stored));
    }
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">My Blood Requests</h1>
      {requests.length === 0 ? (
        <p>You haven’t made any blood requests yet.</p>
      ) : (
        <ul className="space-y-4">
          {requests.map((req, idx) => (
            <li key={idx} className="bg-white p-4 rounded shadow">
              <p><strong>Patient:</strong> {req.patient_name}</p>
              <p><strong>Blood Group:</strong> {req.blood_group}</p>
              <p><strong>Hospital:</strong> {req.hospital_name}</p>
              <p><strong>Location:</strong> {req.location}</p>
              <p><strong>Status:</strong> {req.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyRequests;
