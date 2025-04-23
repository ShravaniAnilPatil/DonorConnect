import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [userType, setUserType] = useState("requestor");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if user is already logged in
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.email) {
      navigate(location.state?.from || "/profile");
    }
  }, [navigate, location]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const endpoint = userType === "donor" ? "/donors/login" : "/users/login";

    try {
      const res = await axios.post(`http://localhost:5000/api${endpoint}`, form);
      
      // Store user data with name if available
      const storedUser = {
        email: form.email,
        userType: res.data.user_type || userType,
        name: res.data.name || "",
        isAuthenticated: true
      };
      
      localStorage.setItem("user", JSON.stringify(storedUser));
      
      // Show success message
      alert(res.data.message || "Login successful!");
      
      // Navigate to the intended page or profile
      navigate(location.state?.from || "/profile");
    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
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
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-red-600 mb-4 text-center">Login</h2>

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
        <form onSubmit={handleSubmit}>
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

          <button
            type="submit"
            disabled={loading}
            className={`w-full ${loading ? 'bg-gray-400' : 'bg-red-500 hover:bg-red-600'} text-white py-2 rounded transition`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">Don't have an account?</p>
          <button
            type="button"
            onClick={goToRegister}
            className="text-red-500 hover:text-red-700 mt-1"
          >
            Sign up as {userType === "donor" ? "Donor" : "Requestor"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;