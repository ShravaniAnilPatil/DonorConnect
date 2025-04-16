import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterRequestor = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    blood_group: "",
    location: "",
  });
  
  const [errors, setErrors] = useState({
    phone: "",
  });

  const validatePhoneNumber = (phone) => {
    const pattern = /^[789]\d{9}$/;
    return pattern.test(phone);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Phone validation
    if (name === "phone") {
      setErrors({
        ...errors,
        phone: validatePhoneNumber(value)
          ? ""
          : "Phone number must be 10 digits and start with 7, 8, or 9.",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate phone number before submitting
    if (!validatePhoneNumber(form.phone)) {
      setErrors({
        ...errors,
        phone: "Phone number must be 10 digits and start with 7, 8, or 9.",
      });
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/users/register", form);
      alert(res.data.message);
      navigate("/"); 
    } catch (err) {
      alert(err.response?.data?.error || "Registration failed");
    }
  };

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-6">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl p-8 w-full max-w-xl">
        <h2 className="text-2xl font-bold text-red-600 mb-6 text-center">Requestor Registration</h2>

        {/* Name */}
        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded"
            required
          />
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Phone Number</label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded"
            required
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>

        {/* Blood Group Dropdown */}
        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Blood Group</label>
          <select
            name="blood_group"
            value={form.blood_group}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded"
            required
          >
            <option value="">Select Blood Group</option>
            {bloodGroups.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </div>

        {/* Location */}
        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Location</label>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block mb-1 text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded"
            required
          />
        </div>

        <button type="submit" className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterRequestor;
