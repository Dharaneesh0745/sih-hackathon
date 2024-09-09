import React, { useState } from 'react';
import { FaHome, FaFire, FaCompass, FaBars, FaTimes, FaThumbsUp, FaComment, FaShare, FaArrowDown } from 'react-icons/fa';

const Community = () => {
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(true);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true);
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
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white flex flex-col md:flex-row">
      {/* Left Sidebar */}
      {isLeftSidebarOpen && (
        <aside className="bg-white text-gray-800 w-full md:w-64 p-6 shadow-lg sticky top-0 h-screen">
          <div className="flex justify-between items-center mb-6 md:hidden">
            <h2 className="text-xl font-bold text-gray-800">Menu</h2>
            <button onClick={toggleLeftSidebar} className="text-gray-800">
              <FaTimes size={24} />
            </button>
          </div>
          <ul className="space-y-4">
            <li>
              <h2>
                <a href="/" className="flex items-center space-x-3 text-xl hover:text-blue-500 transition-colors">
                  <FaHome />
                  <span>Home</span>
                </a>
              </h2>
            </li>
            <li>
              <h2>
                <a href="/popular" className="flex items-center space-x-3 text-xl hover:text-red-500 transition-colors">
                  <FaFire />
                  <span>Popular</span>
                </a>
              </h2>
            </li>
            <li>
              <h2>
                <a href="/explore" className="flex items-center space-x-3 text-xl hover:text-purple-500 transition-colors">
                  <FaCompass />
                  <span>Explore</span>
                </a>
              </h2>
            </li>
          </ul>

          <div className="relative">
            <div className="flex justify-between items-center mt-8 mb-4">
              <h2 className="text-2xl font-bold">Communities</h2>
              <button onClick={toggleCommunitiesVisibility} className="text-gray-800">
                <FaArrowDown size={24} className={`transition-transform ${areCommunitiesVisible ? 'rotate-180' : ''}`} />
              </button>
            </div>
            {areCommunitiesVisible && (
              <ul className="space-y-3 text-lg">
                <li>
                  <a href="/community1" className="flex items-center space-x-3 hover:underline hover:text-indigo-500 transition-colors">
                    <img src="https://via.placeholder.com/20" alt="favicon" className="w-5 h-5" />
                    <span>r/agedlikemilk</span>
                  </a>
                </li>
                <li>
                  <a href="/community2" className="flex items-center space-x-3 hover:underline hover:text-indigo-500 transition-colors">
                    <img src="https://via.placeholder.com/20" alt="favicon" className="w-5 h-5" />
                    <span>r/ahmedabad</span>
                  </a>
                </li>
                <li>
                  <a href="/community3" className="flex items-center space-x-3 hover:underline hover:text-indigo-500 transition-colors">
                    <img src="https://via.placeholder.com/20" alt="favicon" className="w-5 h-5" />
                    <span>r/aiArt</span>
                  </a>
                </li>
                <li>
                  <a href="/community4" className="flex items-center space-x-3 hover:underline hover:text-indigo-500 transition-colors">
                    <img src="https://via.placeholder.com/20" alt="favicon" className="w-5 h-5" />
                    <span>r/AnimeMirchi</span>
                  </a>
                </li>
                <li>
                  <a href="/community5" className="flex items-center space-x-3 hover:underline hover:text-indigo-500 transition-colors">
                    <img src="https://via.placeholder.com/20" alt="favicon" className="w-5 h-5" />
                    <span>r/announcements</span>
                  </a>
                </li>
              </ul>
            )}
          </div>
        </aside>
      )}

      {/* Main content area */}
      <main className={`flex-1 p-6 transition-all duration-300 ${isLeftSidebarOpen ? 'md:ml-64' : ''} ${isRightSidebarOpen ? 'md:mr-64' : ''}`}>
        {/* Hamburger Buttons */}
        <div className="flex justify-between mb-6">
          <button onClick={toggleLeftSidebar} className="text-white bg-blue-500 p-3 rounded-full shadow-lg md:hidden">
            <FaBars size={24} />
          </button>
          <button onClick={toggleRightSidebar} className="text-white bg-blue-500 p-3 rounded-full shadow-lg md:hidden">
            <FaBars size={24} />
          </button>
        </div>

        {/* Post 1 */}
        <div className="bg-white text-gray-800 shadow-md rounded-lg p-6 mb-6 transform hover:scale-105 transition-transform duration-300 hover:shadow-xl">
          <h3 className="text-2xl font-semibold mb-4">Australian NRI moving to Hyderabad</h3>
          <p className="text-gray-600">Little about myself - I’ve recently turned 23, graduating with BE in December 2024...</p>
          <div className="flex items-center space-x-4 mt-4 text-gray-500">
            <span onClick={() => handleUpvote(0)} className="cursor-pointer flex items-center">
              <FaThumbsUp className="mr-2" /> {upvotes[0]} Upvotes
            </span>
            <span onClick={() => handleComment(0)} className="cursor-pointer flex items-center">
              <FaComment className="mr-2" /> {comments[0]} Comments
            </span>
            <span onClick={() => handleShare(0)} className="cursor-pointer flex items-center">
              <FaShare className="mr-2" /> Share
            </span>
          </div>
        </div>

        {/* Post 2 */}
        <div className="bg-white text-gray-800 shadow-md rounded-lg p-6 mb-6 transform hover:scale-105 transition-transform duration-300 hover:shadow-xl">
          <h3 className="text-2xl font-semibold mb-4">Is it wrong for a woman to look for a well-settled guy in an arranged marriage?</h3>
          <p className="text-gray-600">Hi guys, So I (25F) had an argument with my partner, about girls demanding...</p>
          <div className="flex items-center space-x-4 mt-4 text-gray-500">
            <span onClick={() => handleUpvote(1)} className="cursor-pointer flex items-center">
              <FaThumbsUp className="mr-2" /> {upvotes[1]} Upvotes
            </span>
            <span onClick={() => handleComment(1)} className="cursor-pointer flex items-center">
              <FaComment className="mr-2" /> {comments[1]} Comments
            </span>
            <span onClick={() => handleShare(1)} className="cursor-pointer flex items-center">
              <FaShare className="mr-2" /> Share
            </span>
          </div>
        </div>

        {/* Post 3 */}
        <div className="bg-white text-gray-800 shadow-md rounded-lg p-6 mb-6 transform hover:scale-105 transition-transform duration-300 hover:shadow-xl">
          <h3 className="text-2xl font-semibold mb-4">How tier-1 and tier-2 college graduates are treated in the industry?</h3>
          <p className="text-gray-600">I’ve noticed a pattern where graduates from tier-1 colleges seem to get more opportunities compared to tier-2 graduates...</p>
          <div className="flex items-center space-x-4 mt-4 text-gray-500">
            <span onClick={() => handleUpvote(2)} className="cursor-pointer flex items-center">
              <FaThumbsUp className="mr-2" /> {upvotes[2]} Upvotes
            </span>
            <span onClick={() => handleComment(2)} className="cursor-pointer flex items-center">
              <FaComment className="mr-2" /> {comments[2]} Comments
            </span>
            <span onClick={() => handleShare(2)} className="cursor-pointer flex items-center">
              <FaShare className="mr-2" /> Share
            </span>
          </div>
        </div>
      </main>
      
      {/* Right Sidebar */}
      {isRightSidebarOpen && (
        <aside className="bg-white text-gray-800 w-full md:w-64 p-6 shadow-lg sticky top-0 h-screen overflow-y-auto">
          <div className="flex justify-between items-center mb-6 md:hidden">
            <h1 className="text-3xl font-bold  mb-2">Suggested Communities</h1>
            <button onClick={toggleRightSidebar} className="text-gray-800">
              <FaTimes size={24} />
            </button>
          </div>
          <h1 className="text-2xl font-bold mb-2">Suggested Communities</h1>
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-green-400 to-blue-500 p-4 rounded-lg shadow-md text-center">
              <h2 className="text-2xl font-bold mb-2">AI Enthusiasts</h2>
              <img src="https://via.placeholder.com/40" alt="AI favicon" className="mx-auto mb-2" />
              <p className="text-gray-700">Join the best community for AI discussions and updates.</p>
            </div>
            <div className="bg-gradient-to-r from-purple-400 to-pink-500 p-4 rounded-lg shadow-md text-center">
              <h2 className="text-2xl font-bold mb-2">AI Art</h2>
              <img src="https://via.placeholder.com/40" alt="AI favicon" className="mx-auto mb-2" />
              <p className="text-gray-700">Explore the world of art created with AI tools.</p>
            </div>
            <div className="bg-gradient-to-r from-yellow-400 to-red-500 p-4 rounded-lg shadow-md text-center">
              <h2 className="text-2xl font-bold mb-2">AI Innovations</h2>
              <img src="https://via.placeholder.com/40" alt="AI favicon" className="mx-auto mb-2" />
              <p className="text-gray-700">Stay updated with the latest AI breakthroughs.</p>
            </div>
            <div className="bg-gradient-to-r from-blue-400 to-teal-500 p-4 rounded-lg shadow-md text-center">
              <h2 className="text-2xl font-bold mb-2">AI in Healthcare</h2>
              <img src="https://via.placeholder.com/40" alt="AI favicon" className="mx-auto mb-2" />
              <p className="text-gray-700">Discover how AI is transforming healthcare.</p>
            </div>
            <div className="bg-gradient-to-r from-orange-400 to-red-500 p-4 rounded-lg shadow-md text-center">
              <h2 className="text-2xl font-bold mb-2">AI for Social Good</h2>
              <img src="https://via.placeholder.com/40" alt="AI favicon" className="mx-auto mb-2" />
              <p className="text-gray-700">Join the movement to use AI for positive social impact.</p>
            </div>
          </div>
        </aside>
      )}
    </div>
  );
};

export default Community;
