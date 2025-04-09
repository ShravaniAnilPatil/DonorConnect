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

function App() {
  const user = localStorage.getItem("user");

  return (
    <Router>
      <div className="font-sans">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              user ? (
                <>
                  <Hero />
                  <SectionInfo />
                  <QuoteSection />
                  <DeveloperSection />
                  <Footer />
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register-donor" element={<RegisterDonor />} />
          <Route path="/register-requestor" element={<RegisterRequestor />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
