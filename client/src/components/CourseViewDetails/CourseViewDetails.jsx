import React from 'react';
import { useParams } from 'react-router-dom';
import { CourseDetailsCard } from '../../data/CourseData';
import {
  FaStar,
  FaClock,
  FaCoins,
  FaUserFriends,
  FaDollarSign,
  FaBookOpen,
} from 'react-icons/fa';
import { MdPlayLesson } from 'react-icons/md';

const CourseViewDetails = () => {
  const { id } = useParams();
  const course = CourseDetailsCard.find((course) => course.u_id === id);

  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <div className="bg-gradient-to-r from-purple-600 to-purple-500 py-12">
        <div className="container mx-auto px-6">
          <div className="text-sm text-white mb-2">
            <span>Courses</span> &gt; <span className="font-bold">{course.name}</span>
          </div>
          <h1 className="text-4xl text-white font-bold">{course.name}</h1>
          <div className="flex items-center space-x-6 mt-6">
            <div className="text-yellow-300 flex items-center space-x-2">
              <span className="text-xl"><FaStar /> {course.reviews}</span>
            </div>
            <div className="flex items-center space-x-2 text-white">
              <FaClock className="text-lg" />
              <span className="text-lg">{course.hours} Hours</span>
            </div>
            <div className="flex items-center space-x-3 text-white">
              <img
                className="w-8 h-8 rounded-full shadow-lg"
                src="profile1.jpg"
                alt="Learner 1"
              />
              <img
                className="w-8 h-8 rounded-full shadow-lg"
                src="profile2.jpg"
                alt="Learner 2"
              />
              <span className="text-lg">{course.Enrolled} Enrolled Learners</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-2 bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
          <h3 className="text-3xl font-semibold mb-6">About the Course</h3>
          <p className="mb-6 text-gray-600">
            In this course, you will learn from basics to advanced topics with hands-on experience. At the end, you will be making projects that you can add to your resume.
          </p>
          <ul className="list-disc pl-5 space-y-4 text-gray-700">
            <li>Get a deep dive into the basics and advanced topics.</li>
            <li>Boost your resume with hands-on projects.</li>
            <li>Showcase strong technical and practical skills.</li>
          </ul>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
          <ul className="space-y-4 text-gray-700">
            <li className="flex items-center space-x-2">
              <FaBookOpen className="text-blue-500" />
              <span>Featured Listing of Resume</span>
            </li>
            <li className="flex items-center space-x-2">
              <FaStar className="text-green-500" />
              <span>Certification</span>
            </li>
            <li className="flex items-center space-x-2">
              <FaClock className="text-yellow-500" />
              <span>Duration: {course.hours} hours</span>
            </li>
            <li className="flex items-center space-x-2">
              <FaCoins className="text-indigo-500" />
              <span>Points: {course.points}</span>
            </li>
            <li className="flex items-center space-x-2">
              <MdPlayLesson className="text-teal-500" />
              <span>Lessons: {course.Lessons}</span>
            </li>
          </ul>

          <button className="w-full mt-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-300 ease-in-out">
            Enroll Now
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 py-12 px-4">
        <h2 className="text-2xl font-bold mb-6">Course Content</h2>
        <div className="text-gray-600 mb-4">{course.Lessons} Sections</div>

        {/* Course Section Example */}
        <div id="section1" className="border-b border-gray-300 cursor-pointer py-4 flex justify-between items-center hover:bg-gray-100">
          <h3 className="font-semibold">Introduction</h3>
          <span className="text-gray-500">3 Lessons</span>
        </div>
        {/* Repeat for other sections */}
      </div>
    </div>
  );
};

export default CourseViewDetails;
