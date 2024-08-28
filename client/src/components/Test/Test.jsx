import React, { useState } from "react";
import { FaUserFriends, FaStar, FaCoins } from "react-icons/fa";

const Test = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const tests = [
    {
      name: "JavaScript Basics",
      taken: 1200,
      reviews: 200,
      points: 150,
      image: "logo512.png",
    },
    {
      name: "React Fundamentals",
      taken: 950,
      reviews: 180,
      points: 180,
      image: "logo512.png",
    },
    {
      name: "Advanced CSS",
      taken: 750,
      reviews: 150,
      points: 170,
      image: "logo512.png",
    },
    {
      name: "Python for Data Science",
      taken: 1600,
      reviews: 250,
      points: 200,
      image: "logo512.png",
    },
    {
      name: "Machine Learning",
      taken: 1100,
      reviews: 220,
      points: 190,
      image: "logo512.png",
    },
    {
      name: "Node.js Mastery",
      taken: 800,
      reviews: 160,
      points: 175,
      image: "logo512.png",
    },
    {
      name: "Full-Stack Development",
      taken: 1300,
      reviews: 210,
      points: 200,
      image: "logo512.png",
    },
    {
      name: "Database Design",
      taken: 900,
      reviews: 170,
      points: 160,
      image: "logo512.png",
    },
    {
      name: "Deep Learning",
      taken: 900,
      reviews: 170,
      points: 160,
      image: "logo512.png",
    },
    {
      name: "HTML",
      taken: 900,
      reviews: 170,
      points: 160,
      image: "logo512.png",
    },
    { name: "C#", taken: 900, reviews: 170, points: 160, image: "logo512.png" },
    {
      name: "Java",
      taken: 900,
      reviews: 170,
      points: 160,
      image: "logo512.png",
    },
  ];

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredTests = tests.filter((test) =>
    test.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastTest = currentPage * itemsPerPage;
  const indexOfFirstTest = indexOfLastTest - itemsPerPage;
  const currentTests = filteredTests.slice(indexOfFirstTest, indexOfLastTest);

  const totalPages = Math.ceil(filteredTests.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 pt-[80px]">
          <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
            Explore Our Tests
          </h1>
          <input
            type="text"
            placeholder="Search for a test..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentTests.map((test, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl duration-300"
            >
              <img
                src={test.image}
                alt={test.name}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h2 className="text-xl font-semibold mb-2">{test.name}</h2>
              <p className="text-gray-600 mb-2">
                <FaUserFriends className="inline-block mr-1 text-sky-500" />{" "}
                <span className="font-bold">{test.taken}</span> taken by
              </p>
              <p className="text-gray-600 mb-2">
                <FaStar className="inline-block mr-1 text-yellow-500" />{" "}
                <span className="font-bold">{test.reviews}</span> reviews
              </p>
              <p className="text-gray-600">
                <FaCoins className="inline-block mr-1 text-yellow-500" />{" "}
                <span className="font-bold">{test.points}</span> Points
              </p>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="mx-4 self-center">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Test;
