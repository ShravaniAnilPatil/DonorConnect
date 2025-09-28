const Footer = () => {
  const quickLinks = [
    { name: "Find Donors", href: "/find-donors" },
    { name: "Register as Donor", href: "/register-donor" },
    { name: "Blood Requests", href: "/all-requests" },
    { name: "Emergency Help", href: "/find-donors" }
  ];

  const bloodGroups = [
    "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"
  ];

  return (
    <footer className="bg-[#1F1F1F] text-gray-300 py-20 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10">
        
        {/* About Section */}
        <div className="md:col-span-2">
          <h2 className="text-3xl font-bold text-red-500 mb-4">DonorConnect</h2>
          <p className="text-base leading-relaxed mb-6">
            <span className="font-semibold text-red-400">DonorConnect</span> is a life-saving platform 
            that bridges the gap between blood donors and those in need. We ensure safe, quick, and 
            reliable connections while maintaining complete privacy and security.
          </p>
          
          {/* Emergency Banner */}
          <div className="bg-red-600 p-4 rounded-lg mb-4">
            <div className="flex items-center">
              <span className="text-2xl mr-3">🚨</span>
              <div>
                <h4 className="font-bold text-white">Emergency Hotline</h4>
                <p className="text-red-100">24/7 Blood Emergency Support</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold text-red-500 mb-4">Quick Links</h3>
          <ul className="space-y-3">
            {quickLinks.map((link, index) => (
              <li key={index}>
                <a 
                  href={link.href} 
                  className="hover:text-red-400 transition-colors duration-200 flex items-center"
                >
                  <span className="mr-2">→</span>
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          {/* Blood Groups */}
          <div className="mt-8">
            <h4 className="font-semibold text-red-400 mb-3">Blood Groups We Serve</h4>
            <div className="grid grid-cols-4 gap-2">
              {bloodGroups.map((group, index) => (
                <span 
                  key={index}
                  className="bg-gray-800 px-2 py-1 rounded text-center text-sm hover:bg-red-600 transition-colors cursor-pointer"
                >
                  {group}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div id="contact">
          <h3 className="text-xl font-bold text-red-500 mb-4">Contact Us</h3>
          
          <div className="space-y-3">
            <div className="flex items-center">
              <span className="text-red-400 mr-3">📧</span>
              <div>
                <p className="text-sm text-gray-400">Email</p>
                <a href="mailto:donorconnect@gmail.com" className="hover:text-red-400">
                  donorconnect@gmail.com
                </a>
              </div>
            </div>
            
            <div className="flex items-center">
              <span className="text-red-400 mr-3">📍</span>
              <div>
                <p className="text-sm text-gray-400">Address</p>
                <p>Panvel, Maharashtra 410206</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <span className="text-red-400 mr-3">📞</span>
              <div>
                <p className="text-sm text-gray-400">Emergency Hotline</p>
                <a href="tel:+919832805245" className="hover:text-red-400 font-semibold">
                  +91-9832805245
                </a>
              </div>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="mt-6">
            <h4 className="font-semibold text-red-400 mb-3">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-2xl hover:text-red-400 transition-colors">📘</a>
              <a href="#" className="text-2xl hover:text-red-400 transition-colors">📷</a>
              <a href="#" className="text-2xl hover:text-red-400 transition-colors">🐦</a>
              <a href="#" className="text-2xl hover:text-red-400 transition-colors">💼</a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-gray-700">
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">
              © 2025 DonorConnect | Designed with ❤️ by Team DonorConnect
            </p>
          </div>
          <div className="md:text-right">
            <p className="text-gray-500">
              <span className="text-red-400 font-semibold">1000+</span> Lives Saved | 
              <span className="text-red-400 font-semibold"> 500+</span> Active Donors
            </p>
          </div>
        </div>
        
        {/* Important Notice */}
        <div className="mt-6 bg-gray-800 p-4 rounded-lg">
          <p className="text-center text-sm text-gray-400">
            <span className="text-red-400">⚠️ Important:</span> Always consult with medical professionals before donating blood. 
            DonorConnect facilitates connections but does not provide medical advice.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
