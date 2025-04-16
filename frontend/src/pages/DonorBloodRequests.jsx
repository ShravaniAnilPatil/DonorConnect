import { useEffect, useState } from "react";

const DonorBloodRequests = () => {
  const [requests, setRequests] = useState([]);
  const [bloodGroup, setBloodGroup] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch donor's blood group and matching requests
  useEffect(() => {
    const fetchRequestsForDonor = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user || user.userType !== "donor") {
          alert("Unauthorized: Only donors can view matching requests.");
          return;
        }

        // Step 1: Get donor's profile
        const donorRes = await fetch("http://localhost:5000/api/donors/profile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: user.email }),
        });

        const donorData = await donorRes.json();
        if (!donorRes.ok || !donorData) throw new Error("Donor not found.");

        const donorBloodGroup = donorData.blood_group;
        setBloodGroup(donorBloodGroup);

        // Step 2: Get matching requests
        const reqRes = await fetch(`http://localhost:5000/api/requests/find/${donorBloodGroup}`);
        const reqData = await reqRes.json();
        if (!reqRes.ok) throw new Error("Failed to fetch requests.");

        setRequests(reqData.requests || []);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequestsForDonor();
  }, []);

  // Handle status update (approve, reject, pending)
  const updateStatus = async (requestId, newStatus) => {
    if (!requestId) {
      alert("Invalid request ID.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/requests/${requestId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to update status");
      }

      // Refresh list after status update
      setRequests((prev) =>
        prev.map((req) =>
          req._id === requestId ? { ...req, status: newStatus } : req
        )
      );
    } catch (err) {
      console.error("Status update error:", err);
      alert("Failed to update status.");
    }
  };

  if (loading) return <div className="p-6 text-center">Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-red-600 mb-4 text-center">
        Requests for You
      </h2>

      {requests.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-4">
          {requests.map((req, i) => (
            <div key={i} className="p-4 bg-white rounded shadow-md border">
              <p><strong>Patient:</strong> {req.patient_name}</p>
              <p><strong>Hospital:</strong> {req.hospital_name}</p>
              <p><strong>Location:</strong> {req.location}</p>
              <p><strong>Email:</strong> {req.email}</p>
              <p>
                <strong>Status:</strong>{" "}
                <span className={`ml-1 ${req.status === "pending" ? "text-yellow-600" : req.status === "approved" ? "text-green-600" : "text-red-600"}`}>
                  {req.status}
                </span>
              </p>

              {/* Status Buttons */}
              <div className="mt-2 flex gap-2">
                <button
                  className="px-3 py-1 text-white bg-green-600 rounded hover:bg-green-700"
                  onClick={() => updateStatus(req._id, "approved")}
                >
                  Approve
                </button>
                <button
                  className="px-3 py-1 text-white bg-red-600 rounded hover:bg-red-700"
                  onClick={() => updateStatus(req._id, "rejected")}
                >
                  Reject
                </button>
                <button
                  className="px-3 py-1 text-white bg-yellow-500 rounded hover:bg-yellow-600"
                  onClick={() => updateStatus(req._id, "pending")}
                >
                  Pending
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No matching blood requests found.</p>
      )}
    </div>
  );
};

export default DonorBloodRequests;
