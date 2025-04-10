import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterDonor = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    age: "",
    blood_group: "",
    contact: "",
    location: "",
    last_donation_date: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/donors/register", form);
      alert(res.data.message);
  
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: form.name,
          email: form.email,
          user_type: "donor",
        })
      );
  
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.error || "Registration failed.");
    }
  };
  

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-xl"
      >
        <h2 className="text-2xl font-bold text-red-600 mb-6 text-center">
          Donor Registration
        </h2>

        {[
          ["name", "Name"],
          ["email", "Email"],
          ["age", "Age"],
          ["contact", "Contact Number"],
          ["location", "Location"],
          ["password", "Password"],
        ].map(([key, label]) => (
          <div key={key} className="mb-4">
            <label className="block mb-1 text-gray-700">{label}</label>
            <input
              type={key === "password" ? "password" : "text"}
              name={key}
              value={form[key]}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded"
              required
            />
          </div>
        ))}
        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Blood Group</label>
          <select
            name="blood_group"
            value={form.blood_group}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded"
            required
          >
            <option value="">Select</option>
            {bloodGroups.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-6">
          <label className="block mb-1 text-gray-700">Last Donation Date</label>
          <input
            type="date"
            name="last_donation_date"
            value={form.last_donation_date}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterDonor;
