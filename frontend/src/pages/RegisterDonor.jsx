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
    password: "", // Keep the password field
  });

  const [errors, setErrors] = useState({
    contact: "",
  });

  const navigate = useNavigate();

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  // Contact number validation (must be 10 digits and start with 7, 8, or 9)
  const validateContact = (contact) => {
    const pattern = /^[789]\d{9}$/;
    return pattern.test(contact);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === "contact") {
      setErrors({
        ...errors,
        contact: validateContact(value)
          ? ""
          : "Contact number must be 10 digits and start with 7, 8, or 9.",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateContact(form.contact)) {
      alert("Please correct the errors before submitting.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/donors/register",
        form
      );

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

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-xl"
      >
        <h2 className="text-2xl font-bold text-red-600 mb-6 text-center">
          Donor Registration
        </h2>

        {[["name", "Name"], ["email", "Email"], ["age", "Age"], ["location", "Location"]].map(
          ([key, label]) => (
            <div key={key} className="mb-4">
              <label className="block mb-1 text-gray-700">{label}</label>
              <input
                type="text"
                name={key}
                value={form[key]}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded"
                required
              />
            </div>
          )
        )}

        {/* Contact */}
        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Contact Number</label>
          <input
            type="text"
            name="contact"
            value={form.contact}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded"
            required
          />
          {errors.contact && (
            <p className="text-red-500 text-sm mt-1">{errors.contact}</p>
          )}
        </div>

        {/* Password (no validation here) */}
        <div className="mb-4">
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

        {/* Blood Group */}
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

        {/* Last Donation Date */}
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
