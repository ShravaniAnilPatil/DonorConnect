import DeveloperImg from '../assets/shravani.jpg';

const DeveloperSection = () => {
  const developer = {
    name: "Shravani Patil",
    role: "Full Stack Developer",
    github: "https://github.com/ShravaniAnilPatil",
    img: DeveloperImg,
  };

  return (
    <section className="bg-gradient-to-r from-[#ffe6e6] to-[#fff5f5] py-20 px-6 text-center">
      <h2 className="text-3xl font-extrabold text-red-600 mb-10 tracking-wide">
        Meet the Developer
      </h2>

      <div className="flex justify-center">
        <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full transform hover:scale-105 transition duration-300 ease-in-out">
          <img
            src={developer.img}
            alt={developer.name}
            className="w-32 h-32 rounded-full mx-auto border-4 border-red-400 mb-6 object-cover"
          />
          <h3 className="text-2xl font-bold text-gray-800">{developer.name}</h3>
          <p className="text-red-500 font-medium mt-2">{developer.role}</p>
          <a
            href={developer.github}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-white bg-red-500 hover:bg-red-600 px-5 py-2 rounded-full transition"
          >
            Visit GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default DeveloperSection;
