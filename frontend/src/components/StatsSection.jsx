const StatsSection = () => {
  const stats = [
    {
      icon: "❤️",
      number: "1,200+",
      label: "Lives Saved",
      description: "Through successful blood donations"
    },
    {
      icon: "🩸",
      number: "800+",
      label: "Active Donors",
      description: "Ready to help in emergencies"
    },
    {
      icon: "🏥",
      number: "50+",
      label: "Partner Hospitals",
      description: "Across Maharashtra region"
    },
    {
      icon: "⚡",
      number: "24/7",
      label: "Emergency Support",
      description: "Round the clock assistance"
    }
  ];

  const bloodFacts = [
    "Every 2 seconds, someone in India needs blood",
    "One blood donation can save up to 3 lives",
    "Only 1% of India's population donates blood",
    "Blood cannot be manufactured - only donated"
  ];

  return (
    <section className="bg-red-600 text-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Main Stats */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Impact So Far</h2>
          <p className="text-red-100 text-lg max-w-2xl mx-auto">
            Together, we're making a difference in saving lives across Maharashtra
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="bg-white bg-opacity-10 rounded-xl p-6 hover:bg-opacity-20 transition-all duration-300">
                <div className="text-4xl mb-3">{stat.icon}</div>
                <div className="text-3xl font-bold mb-2">{stat.number}</div>
                <div className="text-xl font-semibold mb-1">{stat.label}</div>
                <div className="text-red-100 text-sm">{stat.description}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Blood Facts */}
        <div className="bg-white bg-opacity-10 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-center mb-8">Did You Know?</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {bloodFacts.map((fact, index) => (
              <div key={index} className="flex items-start">
                <span className="text-yellow-300 text-xl mr-3 mt-1">💡</span>
                <p className="text-red-100">{fact}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <h3 className="text-2xl font-bold mb-4">Ready to Join Our Mission?</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => window.location.href = '/register-donor'}
              className="bg-white text-red-600 hover:bg-gray-100 px-8 py-3 font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Become a Donor Today
            </button>
            <button 
              onClick={() => window.location.href = '/find-donors'}
              className="bg-transparent border-2 border-white hover:bg-white hover:text-red-600 px-8 py-3 font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Find Blood Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;