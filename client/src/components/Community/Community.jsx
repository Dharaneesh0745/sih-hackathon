import React, { useState } from "react";
import {
  FaHome,
  FaFire,
  FaList,
  FaCompass,
  FaTimes,
  FaThumbsUp,
  FaComment,
  FaShare,
  FaArrowDown,
} from "react-icons/fa";

const Community = () => {
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const [upvotes, setUpvotes] = useState([33, 15, 20]);
  const [comments, setComments] = useState([31, 53, 12]);
  const [areCommunitiesVisible, setAreCommunitiesVisible] = useState(true);

  const toggleLeftSidebar = () => {
    setIsLeftSidebarOpen(!isLeftSidebarOpen);
  };

  const toggleRightSidebar = () => {
    setIsRightSidebarOpen(!isRightSidebarOpen);
  };

  const handleUpvote = (index) => {
    const newUpvotes = [...upvotes];
    newUpvotes[index] += 1;
    setUpvotes(newUpvotes);
  };

  const handleComment = (index) => {
    const newComments = [...comments];
    newComments[index] += 1;
    setComments(newComments);
  };

  const handleShare = (index) => {
    alert(`Post ${index + 1} shared!`);
  };

  const toggleCommunitiesVisibility = () => {
    setAreCommunitiesVisible(!areCommunitiesVisible);
  };

  return (
    <>
      <style>{`
      .content-container {
        padding-top: 40px; /* Adjust this value to add enough space below the fixed icons */
      }
      .hide-scrollbar::-webkit-scrollbar {
        display: none;
      }
      .hide-scrollbar {
        -ms-overflow-style: none;
        scrollbar-width: none;  
      }
    `}</style>
      <div className="min-h-screen bg-gray-200 text-white flex">
        {/* Left Sidebar */}
        {/* Hidden by default on small screens, visible on md and above */}
        <aside
          className={`
          bg-white text-gray-800 
          w-64 
          p-6 
          shadow-lg 
          fixed 
          inset-y-0 
          left-0 
          transform 
          ${isLeftSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 
          md:static 
          md:w-1/5 
          transition-transform 
          duration-300 
          ease-in-out
          z-100
        `}
        >
          {/* Close button visible only on small screens */}
          <div className="flex justify-between items-center mb-6 md:hidden">
            <h2 className="text-xl font-bold text-gray-800">Menu</h2>
            <button onClick={toggleLeftSidebar} className="text-gray-800">
              <FaTimes size={24} />
            </button>
          </div>
          {/* Menu Items */}
          <ul className="space-y-4">
            <li>
              <a
                href="/"
                className="flex items-center space-x-3 text-xl hover:text-blue-500 transition-colors"
              >
                <FaHome />
                <span>Home</span>
              </a>
            </li>
            <li>
              <a
                href="/popular"
                className="flex items-center space-x-3 text-xl hover:text-red-500 transition-colors"
              >
                <FaFire />
                <span>Popular</span>
              </a>
            </li>
            <li>
              <a
                href="/explore"
                className="flex items-center space-x-3 text-xl hover:text-purple-500 transition-colors"
              >
                <FaCompass />
                <span>Explore</span>
              </a>
            </li>
          </ul>

          {/* Communities Section */}
          <div className="relative mt-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Communities</h2>
              <button
                onClick={toggleCommunitiesVisibility}
                className="text-gray-800"
              >
                <FaArrowDown
                  size={24}
                  className={`transition-transform ${
                    areCommunitiesVisible ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>
            {areCommunitiesVisible && (
              <ul className="space-y-3 text-lg">
                <li>
                  <a
                    href="/community1"
                    className="flex items-center space-x-3 hover:underline hover:text-indigo-500 transition-colors"
                  >
                    <img
                      src="https://via.placeholder.com/20"
                      alt="favicon"
                      className="w-5 h-5"
                    />
                    <span>r/reactjs</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/community2"
                    className="flex items-center space-x-3 hover:underline hover:text-indigo-500 transition-colors"
                  >
                    <img
                      src="https://via.placeholder.com/20"
                      alt="favicon"
                      className="w-5 h-5"
                    />
                    <span>r/django</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/community3"
                    className="flex items-center space-x-3 hover:underline hover:text-indigo-500 transition-colors"
                  >
                    <img
                      src="https://via.placeholder.com/20"
                      alt="favicon"
                      className="w-5 h-5"
                    />
                    <span>r/springboot</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/community4"
                    className="flex items-center space-x-3 hover:underline hover:text-indigo-500 transition-colors"
                  >
                    <img
                      src="https://via.placeholder.com/20"
                      alt="favicon"
                      className="w-5 h-5"
                    />
                    <span>r/mernstack</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/community5"
                    className="flex items-center space-x-3 hover:underline hover:text-indigo-500 transition-colors"
                  >
                    <img
                      src="https://via.placeholder.com/20"
                      alt="favicon"
                      className="w-5 h-5"
                    />
                    <span>r/golang</span>
                  </a>
                </li>
              </ul>
            )}
          </div>
        </aside>

        {/* Overlay for small screens when sidebar is open */}
        {isLeftSidebarOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-20 md:hidden"
            onClick={toggleLeftSidebar}
          ></div>
        )}

        {/* Main content area */}
        <main
          className={`
          flex-1 
          p-6 
          transition-all 
          duration-300 
          sticky
          overflow-y-scroll
          ml-0 
          md:ml-1/5 
          ${isRightSidebarOpen ? "mr-0" : ""}
        `}
        >
          {/* Hamburger Buttons - Visible only on small screens */}
          <div className="flex justify-between mb-6 md:hidden">
            <button
              onClick={toggleLeftSidebar}
              className="fixed top-4 left-4 z-50 text-white bg-red-500 p-3 rounded-full shadow-lg mt-16"
            >
              <FaList size={24} />
            </button>
            <button
              onClick={toggleRightSidebar}
              className="fixed top-4 right-4 z-50 text-white bg-red-500 p-3 rounded-full shadow-lg mt-16"
            >
              <FaFire size={24} />
            </button>
          </div>

          {/* Posts */}
          {/* Post 1 */}
          <div className="content-container mt-8 p-4">
            <div className="bg-white text-gray-800 shadow-md rounded-lg p-6 mb-6 transform hover:scale-105 transition-transform duration-300 hover:shadow-xl">
              <h3 className="text-2xl font-semibold mb-4">
                JavaScript Enthusiast Learning React
              </h3>
              <p className="text-gray-600">
                I’m a 23-year-old programmer with a passion for JavaScript.
                Currently deep-diving into React.js, I’m focusing on building
                dynamic, responsive web applications. My goal is to master
                front-end development and enhance my skills in state management
                with Redux.
              </p>
              <div className="flex items-center space-x-4 mt-4 text-gray-500">
                <span
                  onClick={() => handleUpvote(0)}
                  className="cursor-pointer flex items-center"
                >
                  <FaThumbsUp className="mr-2" /> {upvotes[0]} Upvotes
                </span>
                <span
                  onClick={() => handleComment(0)}
                  className="cursor-pointer flex items-center"
                >
                  <FaComment className="mr-2" /> {comments[0]} Comments
                </span>
                <span
                  onClick={() => handleShare(0)}
                  className="cursor-pointer flex items-center"
                >
                  <FaShare className="mr-2" /> Share
                </span>
              </div>
            </div>
            <div className="bg-white text-gray-800 shadow-md rounded-lg p-6 mb-6 transform hover:scale-105 transition-transform duration-300 hover:shadow-xl">
              <h3 className="text-2xl font-semibold mb-4">
                TypeScript Explorer Expanding Skills in Angular
              </h3>
              <p className="text-gray-600">
                Graduating with a BE in December 2024, I’m diving into the world
                of TypeScript and specializing in Angular development. I enjoy
                creating scalable and modular web applications that offer great
                user experiences while maintaining performance and code quality.
              </p>
              <div className="flex items-center space-x-4 mt-4 text-gray-500">
                <span
                  onClick={() => handleUpvote(0)}
                  className="cursor-pointer flex items-center"
                >
                  <FaThumbsUp className="mr-2" /> {upvotes[0]} Upvotes
                </span>
                <span
                  onClick={() => handleComment(0)}
                  className="cursor-pointer flex items-center"
                >
                  <FaComment className="mr-2" /> {comments[0]} Comments
                </span>
                <span
                  onClick={() => handleShare(0)}
                  className="cursor-pointer flex items-center"
                >
                  <FaShare className="mr-2" /> Share
                </span>
              </div>
            </div>
            <div className="bg-white text-gray-800 shadow-md rounded-lg p-6 mb-6 transform hover:scale-105 transition-transform duration-300 hover:shadow-xl">
              <h3 className="text-2xl font-semibold mb-4">
                Python Developer Exploring Django for Full-Stack Apps
              </h3>
              <p className="text-gray-600">
                As a Python enthusiast, I’ve been learning Django to build
                full-stack web applications. I’m focused on using Python’s
                simplicity to create scalable backends while leveraging REST
                APIs to connect with modern frontend frameworks like React.
              </p>
              <div className="flex items-center space-x-4 mt-4 text-gray-500">
                <span
                  onClick={() => handleUpvote(0)}
                  className="cursor-pointer flex items-center"
                >
                  <FaThumbsUp className="mr-2" /> {upvotes[0]} Upvotes
                </span>
                <span
                  onClick={() => handleComment(0)}
                  className="cursor-pointer flex items-center"
                >
                  <FaComment className="mr-2" /> {comments[0]} Comments
                </span>
                <span
                  onClick={() => handleShare(0)}
                  className="cursor-pointer flex items-center"
                >
                  <FaShare className="mr-2" /> Share
                </span>
              </div>
            </div>
            <div className="bg-white text-gray-800 shadow-md rounded-lg p-6 mb-6 transform hover:scale-105 transition-transform duration-300 hover:shadow-xl">
              <h3 className="text-2xl font-semibold mb-4">
                Node.js Backend Developer with Express Proficiency
              </h3>
              <p className="text-gray-600">
                With a growing interest in backend development, I’m specializing
                in Node.js and Express to create efficient and scalable
                server-side applications. My focus is on creating RESTful APIs,
                handling asynchronous operations, and managing real-time data
                with WebSockets.
              </p>
              <div className="flex items-center space-x-4 mt-4 text-gray-500">
                <span
                  onClick={() => handleUpvote(0)}
                  className="cursor-pointer flex items-center"
                >
                  <FaThumbsUp className="mr-2" /> {upvotes[0]} Upvotes
                </span>
                <span
                  onClick={() => handleComment(0)}
                  className="cursor-pointer flex items-center"
                >
                  <FaComment className="mr-2" /> {comments[0]} Comments
                </span>
                <span
                  onClick={() => handleShare(0)}
                  className="cursor-pointer flex items-center"
                >
                  <FaShare className="mr-2" /> Share
                </span>
              </div>
            </div>

            {/* Post 2 */}
            <div className="bg-white text-gray-800 shadow-md rounded-lg p-6 mb-6 transform hover:scale-105 transition-transform duration-300 hover:shadow-xl">
              <h3 className="text-2xl font-semibold mb-4">
                Aspiring Mobile Developer Using React Native
              </h3>
              <p className="text-gray-600">
                As a developer excited about mobile platforms, I’m currently
                mastering React Native to build cross-platform mobile
                applications. My goal is to create seamless, performant apps
                that offer a native-like experience on both Android and iOS
                devices.
              </p>
              <div className="flex items-center space-x-4 mt-4 text-gray-500">
                <span
                  onClick={() => handleUpvote(1)}
                  className="cursor-pointer flex items-center"
                >
                  <FaThumbsUp className="mr-2" /> {upvotes[1]} Upvotes
                </span>
                <span
                  onClick={() => handleComment(1)}
                  className="cursor-pointer flex items-center"
                >
                  <FaComment className="mr-2" /> {comments[1]} Comments
                </span>
                <span
                  onClick={() => handleShare(1)}
                  className="cursor-pointer flex items-center"
                >
                  <FaShare className="mr-2" /> Share
                </span>
              </div>
            </div>

            {/* Post 3 */}
            <div className="bg-white text-gray-800 shadow-md rounded-lg p-6 mb-6 transform hover:scale-105 transition-transform duration-300 hover:shadow-xl">
              <h3 className="text-2xl font-semibold mb-4">
                C++ and Data Structures Enthusiast Exploring Competitive
                Programming
              </h3>
              <p className="text-gray-600">
                My interest lies in problem-solving and data structures using
                C++. I’m constantly participating in coding challenges and
                exploring competitive programming platforms to sharpen my
                algorithmic thinking and improve efficiency in real-world
                problem-solving.
              </p>
              <div className="flex items-center space-x-4 mt-4 text-gray-500">
                <span
                  onClick={() => handleUpvote(2)}
                  className="cursor-pointer flex items-center"
                >
                  <FaThumbsUp className="mr-2" /> {upvotes[2]} Upvotes
                </span>
                <span
                  onClick={() => handleComment(2)}
                  className="cursor-pointer flex items-center"
                >
                  <FaComment className="mr-2" /> {comments[2]} Comments
                </span>
                <span
                  onClick={() => handleShare(2)}
                  className="cursor-pointer flex items-center"
                >
                  <FaShare className="mr-2" /> Share
                </span>
              </div>
            </div>
          </div>
        </main>

        {/* Right Sidebar */}
        {/* Hidden by default on small screens, visible on md and above */}
        <aside
          className={`
          bg-white text-gray-800 
          w-64 
          p-6 
          shadow-lg 
          fixed 
          inset-y-0 
          right-0 
          transform 
          ${isRightSidebarOpen ? "translate-x-0" : "translate-x-full"} 
          md:translate-x-0 
          md:static 
          md:w-1/5 
          transition-transform 
          duration-300 
          ease-in-out 
          z-100
        `}
        >
          {/* Close button visible only on small screens */}
          <div className="flex justify-between items-center mb-6 md:hidden">
            <h2 className="text-xl font-bold text-gray-800">Trending</h2>
            <button onClick={toggleRightSidebar} className="text-gray-800">
              <FaTimes size={24} />
            </button>
          </div>
          {/* Trending Posts */}
          <h2 className="text-2xl font-bold mb-4">Trending Posts</h2>
          <ul className="space-y-4 text-lg">
            <li>
              <a
                href="/post1"
                className="flex items-center space-x-3 hover:underline hover:text-red-500 transition-colors"
              >
                <FaFire />
                <span>Front-End Developer with React Expertise</span>
              </a>
            </li>
            <li>
              <a
                href="/post2"
                className="flex items-center space-x-3 hover:underline hover:text-red-500 transition-colors"
              >
                <FaFire />
                <span>Data Scientist Specializing in AI/ML</span>
              </a>
            </li>
            <li>
              <a
                href="/post3"
                className="flex items-center space-x-3 hover:underline hover:text-red-500 transition-colors"
              >
                <FaFire />
                <span>Cloud Engineer with AWS Certification</span>
              </a>
            </li>
          </ul>
        </aside>

        {/* Overlay for small screens when right sidebar is open */}
        {isRightSidebarOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-20 md:hidden"
            onClick={toggleRightSidebar}
          ></div>
        )}
      </div>
    </>
  );
};

export default Community;
