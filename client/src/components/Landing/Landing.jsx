import React,{useState} from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <>
    
      <div className="bg-gray-100 text-gray-900">
        <nav className="bg-white shadow-md">
          <div className="container mx-auto flex items-center justify-between py-4 px-6">
            <Link to={'/getstarted'} className="text-2xl font-bold text-blue-600">
              Employment Platform
            </Link>
            <div className="md:hidden">
              <button id="menu-btn" className="text-gray-700 focus:outline-none" onClick={toggleMenu}>
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
            <ul id="menu" className="hidden md:flex space-x-6">
              <li>
                <Link to={"#features"} className="text-gray-700 hover:text-blue-600 transition">
                  Features
                </Link>
              </li>
              <li>
                <Link to={"#demo"} className="text-gray-700 hover:text-blue-600 transition">
                  Demo
                </Link>
              </li>
              <li>
                <Link to={"#testimonials"} className="text-gray-700 hover:text-blue-600 transition">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link to={"#contact"} className="text-gray-700 hover:text-blue-600 transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div id="mobile-menu" className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
            <ul className="px-6 py-4 bg-gray-100">
              <li>
                <Link to={"#features"} className="block py-2 text-gray-700 hover:text-blue-600" onClick={toggleMenu}>
                  Features
                </Link>
              </li>
              <li>
                <Link to={"#demo"} className="block py-2 text-gray-700 hover:text-blue-600" onClick={toggleMenu}>
                  Demo
                </Link>
              </li>
              <li>
                <Link to={"#testimonials"} className="block py-2 text-gray-700 hover:text-blue-600" onClick={toggleMenu}>
                  Testimonials
                </Link>
              </li>
              <li>
                <Link to={"#contact"} className="block py-2 text-gray-700 hover:text-blue-600" onClick={toggleMenu}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-24">
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left md:w-1/2 space-y-6">
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-wide">
                Transform Your Career with AI-Powered Job Matching
              </h1>
              <p className="text-lg md:text-xl font-medium text-gray-200">
                Receive personalized job matches and skill development paths tailored to your profile.
              </p>
              <div className="space-x-4">
                <Link
                  to={'/getstarted'}
                  className="inline-block bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold px-6 py-3 rounded-full transition duration-300"
                >
                  Get Started
                </Link>
                <Link
                  to={"#learn-more"}
                  className="inline-block border-2 border-white text-white px-6 py-3 rounded-full hover:bg-white hover:text-blue-600 transition duration-300"
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
            <h2 className="text-3xl md:text-4xl font-bold text-blue-600">The Challenge</h2>
            <p className="text-lg md:text-xl text-gray-700">
              Traditional employment portals are impersonal and inefficient. Our AI-powered platform offers a revolutionary approach.
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-indigo-600">Our Solution</h2>
            <p className="text-lg md:text-xl text-gray-700">
              We provide AI-driven job matching, skill gap analysis, and personalized learning to empower your career journey.
            </p>
          </div>
        </section>

        <section id="features" className="py-20 bg-gray-50">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-12">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                <img
                  src="/assets/ai.png"
                  alt="AI-Powered Job Matching"
                  className="h-16 mx-auto mb-6"
                />
                <h3 className="font-bold text-xl mb-4">AI-Powered Job Matching</h3>
                <p className="text-gray-600">
                  Receive job recommendations tailored to your profile, increasing your chances of success.
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                <img
                  src="/assets/icons8-skills-64.png"
                  alt="Skill Gap Analysis"
                  className="h-16 mx-auto mb-6"
                />
                <h3 className="font-bold text-xl mb-4">Skill Gap Analysis</h3>
                <p className="text-gray-600">
                  Identify gaps in your skills and get personalized recommendations for upskilling.
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                <img
                  src="/assets/m.png"
                  alt="Career Growth"
                  className="h-16 mx-auto mb-6"
                />
                <h3 className="font-bold text-xl mb-4">Career Growth Insights</h3>
                <p className="text-gray-600">
                  Get insights and guidance on how to advance your career based on industry trends and your personal goals.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="demo" className="py-20 bg-indigo-600 text-white">
          <div className="container mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">See It In Action</h2>
            <p className="text-lg md:text-xl">
              Watch a demo to explore our platform's powerful features and how they can benefit you.
            </p>
            <div className="flex justify-center mt-8">
              <Link
                to={"#"}
                className="bg-yellow-500 hover:bg-yellow-600 text-indigo-900 font-semibold px-6 py-3 rounded-full transition duration-300"
              >
                Watch Demo
              </Link>
            </div>
          </div>
        </section>

        <section id="testimonials" className="py-20 bg-gray-100">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-8">What Users Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                <p className="italic text-gray-700">
                  "This platform transformed my job search experience. I found the perfect job and filled my skill gaps!"
                </p>
                <p className="mt-4 font-bold text-indigo-600">- User A</p>
              </div>
              <div className="p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                <p className="italic text-gray-700">
                  "The AI recommendations were spot on. I feel much more confident in my career direction now."
                </p>
                <p className="mt-4 font-bold text-indigo-600">- User B</p>
              </div>
              <div className="p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                <p className="italic text-gray-700">
                  "It's like having a career coach with you 24/7. The personalized paths are a game-changer."
                </p>
                <p className="mt-4 font-bold text-indigo-600">- User C</p>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="py-16 bg-indigo-600 text-white">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold">Get in Touch</h2>
            <p className="text-lg md:text-xl mt-4">
              We're here to help. Contact us with any questions or feedback.
            </p>
            <div className="mt-8">
              <Link
                to={"#"}
                className="bg-yellow-500 hover:bg-yellow-600 text-indigo-900 font-semibold px-6 py-3 rounded-full transition duration-300"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>

        <footer className="bg-gray-800 text-gray-400 py-8">
          <div className="container mx-auto text-center space-y-4">
            <p className="text-sm">
              &copy; 2024 Employment Platform. All rights reserved.
            </p>
            <ul className="flex justify-center space-x-6">
              <li>
                <Link to={"#"} className="hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to={"#"} className="hover:text-white">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to={"#"} className="hover:text-white">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    
    </>
  );
};

export default Landing;