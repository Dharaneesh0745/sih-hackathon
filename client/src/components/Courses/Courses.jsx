import React, { useState } from "react";
import {
  FaUserFriends,
  FaStar,
  FaCoins,
  FaClock,
  FaDollarSign,
} from "react-icons/fa";

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const Course = [
    {
      name: "JavaScript Basics",
      Enrolled: 1200,
      reviews: 200,
      points: 150,
      hours: 40,
      price: 49.99,
      credits: 3,
      image:
        "https://cdn.sanity.io/images/3do82whm/next/a69e3ba2441d35dd1a7945e826064708f30c10a9-1000x667.jpg?w=720&h=480&fit=clip&auto=format",
    },
    {
      name: "React Fundamentals",
      Enrolled: 950,
      reviews: 180,
      points: 180,
      hours: 30,
      price: 59.99,
      credits: 4,
      image:
        "https://miro.medium.com/v2/resize:fit:1400/1*x0d41ns8PTQZz4a3VbMrBg.png",
    },
    {
      name: "Advanced CSS",
      Enrolled: 750,
      reviews: 150,
      points: 170,
      hours: 40,
      price: 49.99,
      credits: 3,
      image:
        "https://kinsta.com/wp-content/uploads/2024/01/wp-advanced-css-techniques.jpg",
    },
    {
      name: "Python for Data Science",
      Enrolled: 1600,
      reviews: 250,
      points: 200,
      hours: 40,
      price: 49.99,
      credits: 3,
      image:
        "https://cdn.shopaccino.com/igmguru/products/data-science--with-python-igmguru_176161162_l.jpg?v=444",
    },
    {
      name: "Machine Learning",
      Enrolled: 1100,
      reviews: 220,
      points: 190,
      hours: 40,
      price: 49.99,
      credits: 3,
      image:
        "https://datascientest.com/en/files/2021/01/Machine-learning-def-.png",
    },
    {
      name: "Node.js Mastery",
      Enrolled: 800,
      reviews: 160,
      points: 175,
      hours: 40,
      price: 49.99,
      credits: 3,
      image:
        "https://repository-images.githubusercontent.com/589013342/62af123c-b359-411a-b727-6c334a7e6dd4",
    },
    {
      name: "Full-Stack Development",
      Enrolled: 1300,
      reviews: 210,
      points: 200,
      hours: 40,
      price: 49.99,
      credits: 3,
      image:
        "https://codingbytes.com/wp-content/uploads/2022/03/full-stack-web-development.jpg",
    },
    {
      name: "Database Design",
      Enrolled: 900,
      reviews: 170,
      points: 160,
      hours: 40,
      price: 49.99,
      credits: 3,
      image:
        "https://bs-uploads.toptal.io/blackfish-uploads/components/open_graph_image/8959179/og_image/optimized/0712-Bad_Practices_in_Database_Design_-_Are_You_Making_These_Mistakes_Dan_Social-754bc73011e057dc76e55a44a954e0c3.png",
    },
    {
      name: "Deep Learning",
      Enrolled: 900,
      reviews: 170,
      points: 160,
      hours: 40,
      price: 49.99,
      credits: 3,
      image:
        "https://miro.medium.com/v2/resize:fit:1024/0*3Fh9G_yItopD0r7f.png",
    },
    {
      name: "HTML",
      Enrolled: 900,
      reviews: 170,
      points: 160,
      hours: 40,
      price: 49.99,
      credits: 3,
      image:
        "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20220630132824/HTML-Full-Form.jpg",
    },
    {
      name: "C#",
      Enrolled: 900,
      reviews: 170,
      points: 160,
      hours: 40,
      price: 49.99,
      credits: 3,
      image:
        "https://assets.codeguru.com/uploads/2021/08/C-Sharp-Tutorials.png",
    },
    {
      name: "Java",
      Enrolled: 900,
      reviews: 170,
      points: 160,
      hours: 40,
      price: 49.99,
      credits: 3,
      image:
        "https://crowdforthink.com/assets/uploads/blogs/582d8348873b7e0fdfaa78320dd3b918.jpg",
    },
  ];

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredCourses = Course.filter((course) =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastCourse = currentPage * itemsPerPage;
  const indexOfFirstCourse = indexOfLastCourse - itemsPerPage;
  const currentCourses = filteredCourses.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  );

  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 pt-[80px]">
            <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
              Explore Our Courses
            </h1>
            <input
              type="text"
              placeholder="Search for a course..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentCourses.map((course, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl duration-300"
              >
                <img
                  src={course.image}
                  alt={course.name}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">
                  {course.name}
                </h2>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  <p className="text-gray-600">
                    <FaUserFriends className="inline-block mr-1 text-sky-500" />
                    <span className="font-bold">{course.Enrolled}</span>{" "}
                    Enrolled
                  </p>
                  <p className="text-gray-600">
                    <FaStar className="inline-block mr-1 text-yellow-500" />
                    <span className="font-bold">{course.reviews}</span> Reviews
                  </p>
                  <p className="text-gray-600">
                    <FaCoins className="inline-block mr-1 text-yellow-500" />
                    <span className="font-bold">{course.points}</span> Points
                  </p>
                  <p className="text-gray-600">
                    <FaClock className="inline-block mr-1 text-gray-500" />
                    <span className="font-bold">{course.hours}</span> Hours
                  </p>
                  <p className="text-gray-600">
                    <FaDollarSign className="inline-block mr-1 text-green-500" />
                    <span className="font-bold">${course.price}</span>
                  </p>
                  <p className="text-gray-600">
                    <FaCoins className="inline-block mr-1 text-gray-500" />
                    <span className="font-bold">{course.credits}</span> Credits
                  </p>
                </div>
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
            <span className="mx-4 self-center text-lg font-semibold text-gray-700">
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
    </>
  );
};

export default Courses;
