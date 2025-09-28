import { useNavigate } from "react-router-dom";

const SectionInfo = () => {
  const navigate = useNavigate();

  const handleFindDonorClick = () => {
    navigate("/find-donors");
  };

  const handleEmergencyClick = () => {
    navigate("/all-requests");
  };

  const features = [
    {
      icon: "🔍",
      title: "Find Donors Instantly",
      description: "Search for blood donors by blood group and location in real-time",
      action: handleFindDonorClick,
      buttonText: "Find Donors"
    },
    {
      icon: "🚨",
      title: "Emergency Requests",
      description: "Post urgent blood requirements and get immediate responses",
      action: handleEmergencyClick,
      buttonText: "View Requests"
    },
    {
      icon: "🛡️",
      title: "Safe & Secure",
      description: "Your privacy is protected. Connect safely with verified donors",
      action: () => navigate("/register-donor"),
      buttonText: "Join Now"
    }
  ];

  return (
    <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-6">
      {/* Main heading */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
          HOW WE <span className="text-red-600">CONNECT</span> LIVES
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto text-lg">
          DonorConnect makes blood donation simple, safe, and accessible. 
          We bridge the gap between those who need blood and those who can give it.
        </p>
      </div>

      {/* Feature cards */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 mb-12">
        {features.map((feature, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300">
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">{feature.description}</p>
            <button
              onClick={feature.action}
              className="bg-red-500 hover:bg-red-600 px-6 py-3 text-white font-semibold rounded-lg shadow-md transform hover:scale-105 transition-all duration-200"
            >
              {feature.buttonText}
            </button>
          </div>
        ))}
      </div>

      {/* Process steps */}
      <div className="max-w-4xl mx-auto">
        <h3 className="text-2xl font-bold text-center mb-8 text-gray-800">Simple 3-Step Process</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-red-600 text-2xl font-bold">1</span>
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">Register</h4>
            <p className="text-gray-600 text-sm">Sign up as a donor or someone in need</p>
          </div>
          <div className="text-center">
            <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-red-600 text-2xl font-bold">2</span>
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">Connect</h4>
            <p className="text-gray-600 text-sm">Find matches based on blood group & location</p>
          </div>
          <div className="text-center">
            <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-red-600 text-2xl font-bold">3</span>
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">Donate</h4>
            <p className="text-gray-600 text-sm">Coordinate and save lives together</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionInfo;
