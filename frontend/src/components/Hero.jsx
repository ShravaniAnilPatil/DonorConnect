import { useNavigate } from "react-router-dom";
import heroImage from '../assets/hero.jpg';

const Hero = () => {
  const navigate = useNavigate();

  const handleJoinClick = () => {
    navigate("/login");
  };

  return (
    <section
      className="relative bg-cover bg-center h-[80vh] text-white flex items-center justify-center"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="text-center px-6">
        <h3 className="text-xl mb-2 font-semibold">DONATE BLOOD, SAVE LIFE!</h3>
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          DONATE YOUR BLOOD AND INSPIRE OTHERS TO DONATE.
        </h1>
        <button
          onClick={handleJoinClick}
          className="bg-red-600 hover:bg-red-700 px-6 py-3 text-lg rounded shadow"
        >
          JOIN WITH US →
        </button>
      </div>
    </section>
  );
};

export default Hero;
