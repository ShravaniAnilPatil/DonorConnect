const Footer = () => {
  return (
    <footer className="bg-[#1F1F1F] text-gray-300 py-20 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10">
        {/* About */}
        <div className="md:col-span-2">
          <h2 className="text-3xl font-bold text-red-500 mb-4">Let's Make All Bonded</h2>
          <p className="text-base leading-relaxed">
            <span className="font-semibold text-red-400">Donor Connect</span> is a web-based blood donation platform 
            that connects thousands of blood donors in three simple steps. Bonded ensures hassle-free blood donation 
            and maintains the privacy of donors. A donor can choose a specific date and location to donate blood and 
            easily find someone in need.
          </p>
        </div>

        {/* Contact Us */}
        <div>
          <h3 className="text-xl font-bold text-red-500 mb-3">Contact Us</h3>
          <p className="mb-2">📧 donorconnect@gmail.com</p>
          <p className="mb-2">📍 Panvel, Maharashtra 410206</p>
          <p className="mb-2">📞 +91-9832805245</p>
        </div>

        {/* Support Links */}
        <div>
          <h3 className="text-xl font-bold text-red-500 mb-3">Support Links</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-red-400">Link 1</a></li>
            <li><a href="#" className="hover:text-red-400">Link 2</a></li>
            <li><a href="#" className="hover:text-red-400">Link 3</a></li>
          </ul>
        </div>
      </div>

      {/* Credits */}
      <div className="text-center mt-16 text-sm text-gray-500 border-t border-gray-700 pt-6">
        © 2025 Bonded | Designed with ❤️ by Team Donor Connect
      </div>
    </footer>
  );
};

export default Footer;
