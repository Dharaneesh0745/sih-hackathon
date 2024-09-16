import React, { useState } from "react";
import {
  FaUserFriends,
  FaStar,
  FaCoins,
  FaClock,
  FaDollarSign,
} from "react-icons/fa";
import { MdPlayLesson } from "react-icons/md";
import { CourseDetailsCard } from "../../data/CourseData";
import { useNavigate } from "react-router-dom";

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const navigate = useNavigate()

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredCourses = CourseDetailsCard.filter((course) =>
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
  const handleCourseDetails = (id) => {
    // console.log(id)
    navigate(`/courses/course-view/${id}`)
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
                  onClick = {() => handleCourseDetails(course.u_id)}
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
                    <MdPlayLesson className="inline-block mr-1 text-gray-500" />
                    <span className="font-bold">{course.Chapters}</span> Lessons
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
