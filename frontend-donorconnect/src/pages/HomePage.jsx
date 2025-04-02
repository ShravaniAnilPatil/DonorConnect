import React from "react";
import Navbar from "../components/Navbar"; // Import Navbar
import "../styles/HomePage.css";
import Heroimg from "../images/Hero-image.png"; // Corrected Import
const HomePage = () => {
  return (
    <div className="homepage">
      <Navbar />
      <div className="hero">
        <div className="hero-content">
          <h1>Blood Donation</h1>
          <p>
            A blood donation occurs when a person voluntarily has blood drawn
            and used for transfusions...
          </p>
          <button className="know-more">Know More</button>
        </div>
        <div className="hero-image">
          <img src={Heroimg} alt="Blood Donation" />
        </div>
      </div>
      <div className="search-bar">
       
      </div>
      <button className="help-button">📞</button>
    </div>
  );
};

export default HomePage;
