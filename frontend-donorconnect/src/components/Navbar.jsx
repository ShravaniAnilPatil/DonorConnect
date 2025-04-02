import React from "react";
import "../styles/Navbar.css";
import img1 from "../images/logo1.png"; // Corrected Import

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={img1} alt="Logo" className="logo-img" /> {/* Fixed img1 reference */}
        <span>DonorConnect</span>
      </div>
      <ul className="nav-links">
        <li><a href="/">Home</a></li>
        <li><a href="/blogs">Blogs</a></li>
        <li><a href="/need-blood">Need Blood</a></li>
        <li><a href="/donate-blood">Donate Blood</a></li>
      </ul>
      <div className="auth-buttons">
        <button className="login">Login</button>
        <button className="signup">Sign-up</button>
      </div>
    </nav>
  );
};

export default Navbar;
