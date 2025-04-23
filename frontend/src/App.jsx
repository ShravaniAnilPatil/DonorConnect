import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SectionInfo from "./components/SectionInfo";
import QuoteSection from "./components/QuoteSection";
import DeveloperSection from "./components/DeveloperSection";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import RegisterDonor from "./pages/RegisterDonor";
import RegisterRequestor from "./pages/RegisterRequestor";
import Profile from "./pages/Profile";
import MyRequests from "./pages/MyRequests";
import FindDonors from "./pages/FindDonor";
import AllRequests from "./pages/AllRequests";
import DonorBloodRequests from "./pages/DonorBloodRequests";
import ProtectedRoute from "./components/protectedRoute";
function App() {
  const user = localStorage.getItem("user");

  return (
    <Router>
      <div className="font-sans">
        <Navbar />
        <Routes>
          {/* ✅ PUBLIC HOME PAGE */}
          <Route
            path="/"
            element={
              <>
                <Hero />
                <SectionInfo />
                <QuoteSection />
                <DeveloperSection />
                <Footer />
              </>
            }
          />

          {/* ✅ PUBLIC ROUTES */}
          <Route path="/login" element={<Login />} />
          <Route path="/register-donor" element={<RegisterDonor />} />
          <Route path="/register-requestor" element={<RegisterRequestor />} />
          <Route path="/my-requests" element={user ? <MyRequests /> : <Navigate to="/login" />} />
          <Route path="/find-donors" element={<FindDonors />} />
          <Route path="/all-requests" element={<AllRequests />} />
          <Route path="/donor-requests" element={<DonorBloodRequests />} />

          {/* ✅ PROTECTED PROFILE */}
          <Route
            path="/profile"
            element={user ? <Profile /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
