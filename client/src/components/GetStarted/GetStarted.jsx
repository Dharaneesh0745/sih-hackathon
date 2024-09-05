import React from "react";
import { Link } from "react-router-dom";

const GetStarted = () => {
  return (
    <>
      <div className="bg-gradient-to-r min-h-screen flex items-center justify-center p-4 bg-gray-200">
        <div className="w-full max-w-6xl mx-auto text-center flex flex-col items-center">
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-10 drop-shadow-lg">
            Get Started with Our Platform
          </h1>
          <div className="flex flex-wrap justify-center gap-5">
            <div className="group relative bg-white shadow-2xl h-[200px] w-full max-w-xs rounded-lg p-6 hover:bg-blue-600 hover:-translate-y-2 hover:shadow-lg transition-transform duration-300 flex flex-col items-center justify-center">
              <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-100 transition duration-500 rounded-lg"></div>
              <h2 className="text-xl font-semibold text-gray-800 group-hover:text-white relative z-10">
                Job Seeker
              </h2>
              <p className="text-gray-600 group-hover:text-gray-200 mt-3 text-center relative z-10">
                Find your perfect job match and enhance your skills.
              </p>
              <Link
                to={"/login"}
                className="mt-4 inline-block bg-blue-500 text-white py-2 px-5 rounded-full hover:bg-blue-700 transition duration-300 relative z-10"
              >
                Get Started
              </Link>
            </div>

            <div className="group relative bg-white shadow-2xl h-[200px] w-full max-w-xs rounded-lg p-6 hover:bg-yellow-600 hover:-translate-y-2 hover:shadow-lg transition-transform duration-300 flex flex-col items-center justify-center">
              <div className="absolute inset-0 bg-yellow-600 opacity-0 group-hover:opacity-100 transition duration-500 rounded-lg"></div>
              <h2 className="text-xl font-semibold text-gray-800 group-hover:text-white relative z-10">
                Employer
              </h2>
              <p className="text-gray-600 group-hover:text-gray-200 mt-3 text-center relative z-10">
                Post job opportunities and find the right talent.
              </p>
              <Link
                to={"/employer/login"}
                className="mt-4 inline-block bg-yellow-500 text-white py-2 px-5 rounded-full hover:bg-yellow-700 transition duration-300 relative z-10"
              >
                Get Started
              </Link>
            </div>

            <div className="group relative bg-white shadow-2xl h-[200px] w-full max-w-xs rounded-lg p-6 hover:bg-green-600 hover:-translate-y-2 hover:shadow-lg transition-transform duration-300 flex flex-col items-center justify-center">
              <div className="absolute inset-0 bg-green-600 opacity-0 group-hover:opacity-100 transition duration-500 rounded-lg"></div>
              <h2 className="text-xl font-semibold text-gray-800 group-hover:text-white relative z-10">
                Course Creator
              </h2>
              <p className="text-gray-600 group-hover:text-gray-200 mt-3 text-center relative z-10">
                Manage the platform and oversee user activity.
              </p>
              <Link
                to={""}
                className="mt-4 inline-block bg-green-500 text-white py-2 px-5 rounded-full hover:bg-green-700 transition duration-300 relative z-10"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GetStarted;
