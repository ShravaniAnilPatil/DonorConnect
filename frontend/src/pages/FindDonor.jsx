import { useEffect, useState } from "react";

const FindDonors = () => {
  const [donors, setDonors] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [showFormIndex, setShowFormIndex] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    patient_name: "",
    blood_group: "",
    hospital_name: "",
    location: "",
  });
  useEffect(() => {
    fetchAllDonors();

    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.email && user.userType === "requestor") {
      setFormData((prev) => ({
        ...prev,
        email: user.email,
      }));
    }
  }, []);

  const fetchAllDonors = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/donors/all");
      const data = await res.json();
      setDonors(data);
    } catch (error) {
      console.error("Failed to fetch donors:", error);
    }
  };

  const fetchDonorsByGroup = async (group) => {
    try {
      const res = await fetch(`http://localhost:5000/api/donors/${group}`);
      const data = await res.json();
      setDonors(data);
    } catch (error) {
      console.error("Failed to fetch donors:", error);
    }
  };

  const handleChange = (e) => {
    const group = e.target.value;
    setSelectedGroup(group);
    if (group === "") {
      fetchAllDonors();
    } else {
      fetchDonorsByGroup(group);
    }
  };

  const toggleForm = (index, blood_group) => {
    setShowFormIndex(index === showFormIndex ? null : index);
    setFormData((prev) => ({
      ...prev,
      blood_group,
    }));
  };

  const handleFormInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitRequest = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/requests/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      alert(result.message || result.error);
    } catch (error) {
      console.error("Error sending request:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-red-600">Find Donors</h2>

      <div className="mb-6 flex justify-center">
        <select
          value={selectedGroup}
          onChange={handleChange}
          className="p-2 border rounded text-black"
        >
          <option value="">All Blood Groups</option>
          {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((group) => (
            <option key={group} value={group}>
              {group}
            </option>
          ))}
        </select>
      </div>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4">
        {donors.length > 0 ? (
          donors.map((donor, index) => (
            <div key={index} className="p-4 border rounded bg-white shadow-md">
              <h3 className="text-xl font-semibold text-red-700">{donor.name}</h3>
              <p><strong>Blood Group:</strong> {donor.blood_group}</p>
              <p><strong>Age:</strong> {donor.age}</p>
              <p><strong>Location:</strong> {donor.location}</p>
              <p><strong>Contact:</strong> {donor.contact}</p>
              <p><strong>Email:</strong> {donor.email}</p>
              <p><strong>Last Donation:</strong> {donor.last_donation_date}</p>
              <p>
                <strong>Availability:</strong>{" "}
                <span className={donor.availability ? "text-green-600" : "text-red-600"}>
                  {donor.availability ? "Available" : "Not Available"}
                </span>
              </p>

              <button
                className="mt-3 px-3 py-1 bg-red-600 text-white rounded"
                onClick={() => toggleForm(index, donor.blood_group)}
              >
                Request Blood
              </button>

              {showFormIndex === index && (
                <form className="mt-3 space-y-2" onSubmit={submitRequest}>
                  <input
                    type="text"
                    name="patient_name"
                    placeholder="Patient Name"
                    className="w-full p-2 border rounded"
                    onChange={handleFormInputChange}
                    required
                  />
                  <input
                    type="text"
                    name="hospital_name"
                    placeholder="Hospital Name"
                    className="w-full p-2 border rounded"
                    onChange={handleFormInputChange}
                    required
                  />
                  <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    className="w-full p-2 border rounded"
                    onChange={handleFormInputChange}
                    required
                  />
                  <div className="text-sm text-gray-600 italic">
                    Request will be sent from: <span className="text-black">{formData.email}</span>
                  </div>
                  <button type="submit" className="bg-green-600 text-white px-3 py-1 rounded">
                    Submit Request
                  </button>
                </form>
              )}
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">No donors found.</p>
        )}
      </div>
    </div>
  );
};

export default FindDonors;
