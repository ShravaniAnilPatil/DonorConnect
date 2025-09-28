const QuoteSection = () => {
  const testimonials = [
    {
      quote: "Donating blood through DonorConnect was seamless. I received immediate response when someone needed my blood group urgently.",
      author: "Priya Sharma",
      role: "Regular Donor",
      bloodGroup: "O+"
    },
    {
      quote: "When my father needed blood during surgery, DonorConnect helped us find 3 donors within 2 hours. Forever grateful!",
      author: "Rahul Patil",
      role: "Recipient Family",
      bloodGroup: "AB-"
    },
    {
      quote: "The platform makes it so easy to help others. I've donated 5 times this year and saved multiple lives.",
      author: "Dr. Anjali Mehta",
      role: "Medical Professional & Donor",
      bloodGroup: "A+"
    }
  ];

  return (
    <section className="bg-gradient-to-br from-gray-50 to-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Main Quote */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
            WORDS THAT <span className="text-red-600">INSPIRE</span>
          </h2>
          <div className="bg-red-600 text-white p-8 rounded-2xl max-w-4xl mx-auto shadow-xl">
            <div className="text-6xl text-red-200 mb-4">"</div>
            <p className="text-xl md:text-2xl italic leading-relaxed mb-4">
              A single pint can save three lives, a single gesture can create a million smiles.
            </p>
            <p className="text-red-200 text-lg">— Every Blood Donor Hero</p>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-800">What Our Community Says</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="text-red-400 text-3xl mb-4">"</div>
                <p className="text-gray-600 italic mb-4 leading-relaxed">
                  {testimonial.quote}
                </p>
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-800">{testimonial.author}</p>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                    <div className="bg-red-100 px-3 py-1 rounded-full">
                      <span className="text-red-600 font-semibold text-sm">{testimonial.bloodGroup}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Banner */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl p-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <span className="text-4xl mr-4">🚨</span>
            <h3 className="text-2xl font-bold">Emergency? We're Here 24/7</h3>
          </div>
          <p className="text-red-100 text-lg mb-6">
            Need blood urgently? Our emergency response team connects you with donors instantly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+919832805245"
              className="bg-white text-red-600 hover:bg-gray-100 px-8 py-3 font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              📞 Call Emergency Line
            </a>
            <button 
              onClick={() => window.location.href = '/all-requests'}
              className="bg-transparent border-2 border-white hover:bg-white hover:text-red-600 px-8 py-3 font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              📝 Post Urgent Request
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuoteSection;
