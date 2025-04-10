import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        setIsLoggedIn(true);
        setUserType(user.userType);
      } else {
        setIsLoggedIn(false);
        setUserType("");
      }
    };
  
    checkLogin(); 
  
    const interval = setInterval(checkLogin, 1000); 
  
    return () => clearInterval(interval);
  }, []);
  

  const handleProfileClick = () => {
    navigate(isLoggedIn ? "/profile" : "/login");
  };

  const handleNavClick = async (item) => {
    const routes = {
      Home: "/",
      Blog: "/blog",
      Contact: "/contact",
      "About Us": "/about",
      "Find Donors": "/find-donors",
      Requests: "/all-requests",
    };
  
    const userData = JSON.parse(localStorage.getItem("user"));
    const userType = userData?.userType;
  
    if (item === "My Requests") {
      if (!userData) return;
  
      if (userType === "requestor") {
        const email = userData.email;
        try {
          const response = await fetch(`http://localhost:5000/api/requests/user/${email}`);
          const data = await response.json();
  
          if (response.ok) {
            localStorage.setItem("myRequests", JSON.stringify(data));
          } else {
            alert(data.error || "No requests found.");
          }
        } catch (error) {
          console.error("Failed to fetch requests:", error);
          alert("Something went wrong while fetching your requests.");
        }
  
        navigate("/my-requests");
      } else if (userType === "donor") {
        navigate("/donor-requests");
      }
  
      setIsMenuOpen(false);
      return;
    }
  
    navigate(routes[item] || "/");
    setIsMenuOpen(false);
  };  

  const navItems =
    userType === "donor"
      ? ["Home", "Requests", "My Requests"]
      : ["Home", "My Requests", "Find Donors", "Blog", "Contact", "About Us"];

  return (
    <nav className="bg-red-600 text-white font-[Poppins] px-4 py-4 md:px-8 sticky top-0 z-50 shadow-md transition-all duration-300">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-10">
          <div
            className="text-2xl font-bold cursor-pointer"
            onClick={() => navigate("/")}
          >
            DonorConnect
          </div>
          <ul className="hidden md:flex gap-6 text-base">
            {navItems.map((item) => (
              <li
                key={item}
                className="cursor-pointer transition duration-300 ease-in-out hover:text-yellow-300 hover:scale-105"
                onClick={() => handleNavClick(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden md:flex items-center gap-5 text-xl">
          <i className="fab fa-twitter cursor-pointer hover:text-yellow-300 transition"></i>
          <i className="fab fa-google-plus-g cursor-pointer hover:text-yellow-300 transition"></i>
          <i
            className="fa-solid fa-user cursor-pointer hover:text-yellow-300 transition"
            onClick={handleProfileClick}
            title={isLoggedIn ? "Profile" : "Login"}
          ></i>
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <i className="fa-solid fa-bars text-2xl"></i>
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <ul className="md:hidden mt-4 space-y-4 text-base">
          {navItems.map((item) => (
            <li
              key={item}
              className="cursor-pointer px-2 py-1 transition hover:text-yellow-300"
              onClick={() => handleNavClick(item)}
            >
              {item}
            </li>
          ))}
          <div className="flex gap-5 text-xl mt-2 px-2">
            <i className="fab fa-twitter cursor-pointer hover:text-yellow-300 transition"></i>
            <i className="fab fa-google-plus-g cursor-pointer hover:text-yellow-300 transition"></i>
            <i
              className="fa-solid fa-user cursor-pointer hover:text-yellow-300 transition"
              onClick={handleProfileClick}
              title={isLoggedIn ? "Profile" : "Login"}
            ></i>
          </div>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
