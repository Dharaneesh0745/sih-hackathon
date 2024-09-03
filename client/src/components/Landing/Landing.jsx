import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false); // New state for modal visibility

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const testimonials = [
    {
      text: "This platform transformed my job search experience. I found the perfect job and filled my skill gaps!",
      author: "User A",
    },
    {
      text: "The AI recommendations were spot on. I feel much more confident in my career direction now.",
      author: "User B",
    },
    {
      text: "It's like having a career coach with you 24/7. The personalized paths are a game-changer.",
      author: "User C",
    },
  ];

  const handleNextTestimonial = () => {
    setCurrentTestimonialIndex(
      (currentTestimonialIndex + 1) % testimonials.length
    );
  };

  const handlePrevTestimonial = () => {
    setCurrentTestimonialIndex(
      (currentTestimonialIndex - 1 + testimonials.length) %
        testimonials.length
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextTestimonial();
    }, 5000); // Automatically cycle through testimonials every 5 seconds

    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTestimonialIndex]);

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <style>
        {`
          @keyframes floating {
            0% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-15px);
            }
            100% {
              transform: translateY(0);
            }
          }
          .floating {
            animation: floating 3s ease-in-out infinite;
          }
          .animate-fade-in-down {
            animation: fadeInDown 0.5s ease-in-out;
          }
          .animate-fade-in-up {
            animation: fadeInUp 0.5s ease-in-out;
          }
          .animate-fade-in-left {
            animation: fadeInLeft 0.5s ease-in-out;
          }
          .animate-bounce {
            animation: bounce 1s infinite;
          }
          @keyframes fadeInDown {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes fadeInLeft {
            from {
              opacity: 0;
              transform: translateX(-20px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
        `}
      </style>
      <div className="bg-gray-100 text-gray-900">
        <nav className="bg-white shadow-md">
          <div className="container mx-auto flex items-center justify-between py-4 px-6">
            <Link
              to={"/getstarted"}
              className="text-2xl font-bold text-blue-600 transform hover:scale-110 transition duration-300"
            >
              Employment Platform
            </Link>
            <div className="md:hidden">
              <button
                id="menu-btn"
                className="text-gray-700 focus:outline-none"
                onClick={toggleMenu}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  ></path>
                </svg>
              </button>
            </div>
            <ul
              id="menu"
              className={`hidden md:flex space-x-6 ${
                isMenuOpen ? "block" : "hidden"
              } animate-fade-in-down`}
            >
              <li>
                <Link
                  to={"#features"}
                  className="text-gray-700 hover:text-blue-600 transition hover:scale-110"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  to={"#demo"}
                  className="text-gray-700 hover:text-blue-600 transition hover:scale-110"
                >
                  Demo
                </Link>
              </li>
              <li>
                <Link
                  to={"#testimonials"}
                  className="text-gray-700 hover:text-blue-600 transition hover:scale-110"
                >
                  Testimonials
                </Link>
              </li>
              <li>
                <Link
                  to={"#contact"}
                  className="text-gray-700 hover:text-blue-600 transition hover:scale-110"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div
            id="mobile-menu"
            className={`${
              isMenuOpen ? "block" : "hidden"
            } md:hidden animate-slide-in`}
          >
            <ul className="px-6 py-4 bg-gray-100 space-y-4">
              <li>
                <Link
                  to={"#features"}
                  className="block py-2 text-gray-700 hover:text-blue-600"
                  onClick={toggleMenu}
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  to={"#demo"}
                  className="block py-2 text-gray-700 hover:text-blue-600"
                  onClick={toggleMenu}
                >
                  Demo
                </Link>
              </li>
              <li>
                <Link
                  to={"#testimonials"}
                  className="block py-2 text-gray-700 hover:text-blue-600"
                  onClick={toggleMenu}
                >
                  Testimonials
                </Link>
              </li>
              <li>
                <Link
                  to={"#contact"}
                  className="block py-2 text-gray-700 hover:text-blue-600"
                  onClick={toggleMenu}
                >
                  Contact 
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-24 animate-gradient">
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left md:w-1/2 space-y-6 animate-fade-in-left">
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-wide">
                Transform Your Career with AI-Powered Job Matching
              </h1>
              <p className="text-lg md:text-xl font-medium text-gray-200">
                Receive personalized job matches and skill development paths
                tailored to your profile.
              </p>
              <div className="space-x-4">
                <Link
                  to={"/getstarted"}
                  className="inline-block bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold px-6 py-3 rounded-full transition duration-300 animate-bounce"
                >
                  Get Started
                </Link>
                <Link
                  to={"#learn-more"}
                  className="inline-block border-2 border-white text-white px-6 py-3 rounded-full hover:bg-white hover:text-blue-600 transition duration-300 animate-pulse"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="mt-10 md:mt-0 md:w-1/2 flex justify-center">
              <img
                src="/assets/man-8702916_640.webp"
                alt="Man with Laptop"
                className="w-4/5 h-auto rounded-lg shadow-lg floating"
              />
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-600 animate-fade-in-down">
              The Challenge
            </h2>
            <p className="text-lg md:text-xl text-gray-700">
              Traditional employment portals are impersonal and inefficient. Our
              AI-powered platform offers a revolutionary approach.
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-indigo-600 animate-fade-in-down delay-200">
              Our Solution
            </h2>
            <p className="text-lg md:text-xl text-gray-700">
              We provide AI-driven job matching, skill gap analysis, and
              personalized learning to empower your career journey.
            </p>
          </div>
        </section>

        <section id="features" className="py-20 bg-gray-50">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-12 animate-fade-in-up">
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105">
                <img
                  src="/assets/ai.png"
                  alt="AI-Powered Job Matching"
                  className="h-16 mx-auto mb-6 animate-wiggle"
                />
                <h3 className="font-bold text-xl mb-4">AI-Powered Job Matching</h3>
                <p className="text-gray-600">
                  Receive job recommendations tailored to your profile,
                  increasing your chances of success.
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105">
                <img
                  src="/assets/icons8-skills-64.png"
                  alt="Skill Gap Analysis"
                  className="h-16 mx-auto mb-6 animate-wiggle"
                />
                <h3 className="font-bold text-xl mb-4">Skill Gap Analysis</h3>
                <p className="text-gray-600">
                  Identify the skills you need for your dream job and start
                  developing them today.
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105">
                <img
                  src="/assets/personalized-learning.png"
                  alt="Personalized Learning Paths"
                  className="h-16 mx-auto mb-6 animate-wiggle"
                />
                <h3 className="font-bold text-xl mb-4">
                  Personalized Learning Paths
                </h3>
                <p className="text-gray-600">
                  Get recommendations on courses and training that fit your
                  career goals.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="demo" className="py-20 bg-white">
          <div className="container mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-600 animate-fade-in-up">
              Platform Demo
            </h2>
            <p className="text-lg md:text-xl text-gray-700">
              See how our platform can revolutionize your career search. Click below to watch the video demo.
            </p>
            <button
              onClick={openModal} // Updated to use React's onClick handler
              className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition"
            >
              Watch Video
            </button>
          </div>
        </section>

        {isModalOpen && (
  <div id="videoModal" className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-75">
    <div className="relative w-full max-w-4xl mx-4 sm:mx-auto bg-white rounded-lg shadow-lg">
      {/* Close Button */}
      <button
        onClick={closeModal}
        className="absolute top-2 right-2 w-10 h-10 flex items-center justify-center bg-black bg-opacity-50 rounded-full text-white text-2xl font-bold hover:bg-black transition duration-300"
        aria-label="Close Modal"
      >
        &times;
      </button>
      <div className="relative pb-[56.25%] h-0 overflow-hidden">
        <iframe
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="Platform Demo"
          className="absolute top-0 left-0 w-full h-full rounded-lg"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  </div>
)}



        <section id="testimonials" className="py-20 bg-white">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-12 animate-fade-in-up">
              What Our Users Say
            </h2>
            <div className="max-w-xl mx-auto">
              <div className="bg-gray-100 p-8 rounded-lg shadow-md animate-fade-in-up">
                <p className="text-lg italic text-gray-800 mb-4">
                  "{testimonials[currentTestimonialIndex].text}"
                </p>
                <p className="font-bold text-blue-600">
                  - {testimonials[currentTestimonialIndex].author}
                </p>
              </div>
              <div className="flex justify-between mt-4">
                <button
                  onClick={handlePrevTestimonial}
                  className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300"
                >
                  Previous
                </button>
                <button
                  onClick={handleNextTestimonial}
                  className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </section>

        <section id="get-in-touch" className="bg-indigo-600 text-white py-12">
          <div className="container mx-auto text-center space-y-4 animate-fade-in-up">
            <h3 className="text-xl font-bold">Get in Touch</h3>
            <p>Contact us for more information or to schedule a demo.</p>
            <div className="pt-6">
              <Link
                to={"/contact"}
                className="bg-yellow-500 text-white pt-3 px-6 py-3 rounded-full hover:bg-yellow-600 transition duration-300 animate-pulse"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Landing;
