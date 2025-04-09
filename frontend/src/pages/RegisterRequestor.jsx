import { useState } from "react";
import axios from "axios";

const RegisterRequestor = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    blood_group: "",
    location: "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/user/register", form);
      alert(res.data.message);
    } catch (err) {
      alert(err.response.data.error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-6">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl p-8 w-full max-w-xl">
        <h2 className="text-2xl font-bold text-red-600 mb-6 text-center">Requestor Registration</h2>
        {[
          ["name", "Name"],
          ["email", "Email"],
          ["phone", "Phone Number"],
          ["blood_group", "Blood Group"],
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
        <button type="submit" className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterRequestor;
