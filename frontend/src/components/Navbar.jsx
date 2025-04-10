import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, []);

  const handleProfileClick = () => {
    navigate(isLoggedIn ? "/profile" : "/login");
  };

  return (
    <nav className="bg-red-600 text-white flex justify-between items-center px-8 py-4 font-[Poppins]">
      {/* Left: Logo + Nav Links */}
      <div className="flex items-center gap-10">
        <div className="text-2xl font-bold cursor-pointer" onClick={() => navigate("/")}>
          DonorConnect
        </div>
        <ul className="flex gap-6 text-base">
          {["Home", "Campaign", "Pages", "Blog", "Contact", "About Us"].map((item) => (
            <li
              key={item}
              className="cursor-pointer transition duration-300 ease-in-out hover:text-yellow-300 hover:scale-105"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Right: Icons only */}
      <div className="flex items-center gap-5 text-xl">
        <i className="fab fa-twitter cursor-pointer hover:text-yellow-300 transition"></i>
        <i className="fab fa-google-plus-g cursor-pointer hover:text-yellow-300 transition"></i>

        <i
          className="fa-solid fa-user cursor-pointer hover:text-yellow-300 transition"
          onClick={handleProfileClick}
          title={isLoggedIn ? "Profile" : "Login"}
        ></i>
      </div>
    </nav>
  );
};

export default Navbar;
