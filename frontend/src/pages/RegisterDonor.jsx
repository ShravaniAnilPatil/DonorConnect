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
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    contact: "",
    passwordMatch: "",
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const validateContact = (contact) => /^[789]\d{9}$/.test(contact);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...form, [name]: value };
    setForm(updatedForm);

    if (name === "contact") {
      setErrors((prev) => ({
        ...prev,
        contact: validateContact(value)
          ? ""
          : "Contact must be 10 digits starting with 7, 8, or 9.",
      }));
    }

    if (name === "password" || name === "confirmPassword") {
      setErrors((prev) => ({
        ...prev,
        passwordMatch:
          updatedForm.password === updatedForm.confirmPassword
            ? ""
            : "Passwords do not match.",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!validateContact(form.contact)) {
      alert("Invalid contact number.");
      setLoading(false);
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/donors/request-otp", {
        email: form.email,
      });

      if (res.status === 200) {
        alert("OTP sent to your email. Please check and verify.");
        setOtpSent(true);
      }
    } catch (err) {
      alert(err.response?.data?.error || "Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerify = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!otp) {
      alert("Please enter the OTP.");
      setLoading(false);
      return;
    }

    try {
      // Use the correct endpoint from your backend (/register)
      const res = await axios.post("http://localhost:5000/api/donors/register", {
        ...form,
        otp: otp,
      });

      if (res.status === 201) {
        alert("Registration successful!");

        localStorage.setItem(
          "user",
          JSON.stringify({ name: form.name, email: form.email, userType: "donor" })
        );

        navigate("/");
      }
    } catch (err) {
      alert(err.response?.data?.error || "OTP verification failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-6">
      <form
        onSubmit={otpSent ? handleOtpVerify : handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-xl"
      >
        <h2 className="text-2xl font-bold text-red-600 mb-6 text-center">
          {otpSent ? "Verify OTP" : "Donor Registration"}
        </h2>

        {!otpSent && (
          <>
            {/* Basic Fields */}
            {["name", "email", "age", "location"].map((key) => (
              <div key={key} className="mb-4">
                <label className="block mb-1 text-gray-700 capitalize">{key}</label>
                <input
                  type="text"
                  name={key}
                  value={form[key]}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                  required
                />
              </div>
            ))}

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

            {/* Passwords */}
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

            <div className="mb-4">
              <label className="block mb-1 text-gray-700">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded"
                required
              />
              {errors.passwordMatch && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.passwordMatch}
                </p>
              )}
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
          </>
        )}

        {/* OTP Verification Section */}
        {otpSent && (
          <div className="mb-6">
            <p className="text-gray-700 mb-4">
              An OTP has been sent to your email address. Please check your inbox and enter the OTP below to complete registration.
            </p>
            <label className="block mb-1 text-gray-700">Enter OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded"
              required
            />
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full ${loading ? 'bg-gray-400' : 'bg-red-500 hover:bg-red-600'} text-white py-2 rounded transition`}
        >
          {loading ? "Processing..." : (otpSent ? "Verify OTP & Register" : "Send OTP")}
        </button>
        
        {otpSent && (
          <button
            type="button"
            onClick={() => setOtpSent(false)}
            className="w-full mt-4 bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300 transition"
          >
            Back to Form
          </button>
        )}
      </form>
    </div>
  );
};

export default RegisterDonor;