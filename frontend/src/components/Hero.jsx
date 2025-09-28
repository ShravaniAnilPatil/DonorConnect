import { useNavigate } from "react-router-dom";
import heroImage from '../assets/hero.jpg';

const Hero = () => {
  const navigate = useNavigate();

  const handleJoinClick = () => {
    navigate("/login");
  };

  const handleFindDonorClick = () => {
    navigate("/find-donors");
  };

  const handleRegisterDonorClick = () => {
    navigate("/register-donor");
  };

  return (
    <section
      className="relative bg-cover bg-center h-[85vh] text-white flex items-center justify-center"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <div className="mb-4">
          <span className="bg-red-600 px-4 py-2 text-sm font-semibold rounded-full">
            🩸 SAVE LIVES TODAY
          </span>
        </div>
        
        <h1 className="text-3xl md:text-6xl font-bold mb-4 leading-tight">
          BE THE <span className="text-red-400">REASON</span> SOMEONE SMILES TODAY
        </h1>
        
        <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
          Join thousands of heroes who donate blood and save lives. Every drop counts, every donation matters.
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleRegisterDonorClick}
            className="bg-red-600 hover:bg-red-700 px-8 py-4 text-lg font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            🫶 BECOME A DONOR
          </button>
          
          <button
            onClick={handleFindDonorClick}
            className="bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            🔍 FIND DONORS
          </button>
        </div>

        {/* Statistics */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4">
            <div className="text-2xl font-bold text-red-400">1000+</div>
            <div className="text-sm">Lives Saved</div>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4">
            <div className="text-2xl font-bold text-red-400">500+</div>
            <div className="text-sm">Active Donors</div>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4">
            <div className="text-2xl font-bold text-red-400">24/7</div>
            <div className="text-sm">Emergency Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
