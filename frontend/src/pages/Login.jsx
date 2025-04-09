// Login.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [userType, setUserType] = useState("requestor"); // default to requestor
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = userType === "donor" ? "/donor/login" : "/users/login";

    try {
      const res = await axios.post(`http://localhost:5000/api${endpoint}`, form);
      alert(res.data.message);

      // Store user in localStorage
      const storedUser = {
        email: form.email,
        userType: res.data.user_type || userType,
      };
      localStorage.setItem("user", JSON.stringify(storedUser));

      // Redirect to profile
      navigate("/profile");
    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    }
  };

  const goToRegister = () => {
    if (userType === "donor") {
      navigate("/register-donor");
    } else {
      navigate("/register-requestor");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">
      <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-red-600 mb-4 text-center">Login</h2>

        {/* User Type Toggle */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            type="button"
            onClick={() => setUserType("requestor")}
            className={`px-4 py-2 rounded ${
              userType === "requestor" ? "bg-red-500 text-white" : "bg-gray-200"
            }`}
          >
            Requestor
          </button>
          <button
            type="button"
            onClick={() => setUserType("donor")}
            className={`px-4 py-2 rounded ${
              userType === "donor" ? "bg-red-500 text-white" : "bg-gray-200"
            }`}
          >
            Donor
          </button>
        </div>

        {/* Login Form */}
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
            required
          />
        </div>

        <button type="submit" className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600">
          Login
        </button>

        {/* Signup link */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">Don't have an account?</p>
          <button onClick={goToRegister} className="text-red-500 underline hover:text-red-700 mt-1">
            Sign up as {userType === "donor" ? "Donor" : "Requestor"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
