import React, { useState } from 'react';
import { 
  FaHome, 
  FaFire, 
  FaList,
  FaCompass, 
   
  FaTimes, 
  FaThumbsUp, 
  FaComment, 
  FaShare, 
  FaArrowDown 
} from 'react-icons/fa';

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
    <div className="sticky overflow-y-auto min-h-screen bg-gray-200 text-white flex">
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
          ${isLeftSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
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
            <a href="/" className="flex items-center space-x-3 text-xl hover:text-blue-500 transition-colors">
              <FaHome />
              <span>Home</span>
            </a>
          </li>
          <li>
            <a href="/popular" className="flex items-center space-x-3 text-xl hover:text-red-500 transition-colors">
              <FaFire />
              <span>Popular</span>
            </a>
          </li>
          <li>
            <a href="/explore" className="flex items-center space-x-3 text-xl hover:text-purple-500 transition-colors">
              <FaCompass />
              <span>Explore</span>
            </a>
          </li>
        </ul>

        {/* Communities Section */}
        <div className="relative mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Communities</h2>
            <button onClick={toggleCommunitiesVisibility} className="text-gray-800">
              <FaArrowDown 
                size={24} 
                className={`transition-transform ${areCommunitiesVisible ? 'rotate-180' : ''}`} 
              />
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
          ml-0 
          md:ml-1/5 
          ${isRightSidebarOpen ? 'mr-0' : ''}
        `}
      >
        {/* Hamburger Buttons - Visible only on small screens */}
        <div className="flex justify-between mb-6 md:hidden">
          <button onClick={toggleLeftSidebar} className="fixed top-4 left-4 z-50 text-white bg-red-500 p-3 rounded-full shadow-lg mt-16">
            <FaList size={24} />
          </button>
          <button onClick={toggleRightSidebar} className="fixed top-4 right-4 z-50 text-white bg-red-500 p-3 rounded-full shadow-lg mt-16">
            <FaFire size={24} />
          </button>
        </div>

        {/* Posts */}
        {/* Post 1 */}
        <div className="overflow-y-scroll h-screen hide-scrollbar">
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
          <h3 className="text-2xl font-semibold mb-4">How to manage career growth while working in AI/ML?</h3>
          <p className="text-gray-600">With the rise of AI and ML, it has become essential for professionals...</p>
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
        <div className="bg-white text-gray-800 shadow-md rounded-lg p-6 mb-6 transform hover:scale-105 transition-transform duration-300 hover:shadow-xl">
          <h3 className="text-2xl font-semibold mb-4">What are the latest sustainable building materials in Civil Engineering?</h3>
          <p className="text-gray-600">Sustainable materials like bamboo and recycled steel are gaining traction. What’s your take?</p>
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


        <div className="bg-white text-gray-800 shadow-md rounded-lg p-6 mb-6 transform hover:scale-105 transition-transform duration-300 hover:shadow-xl">
          <h3 className="text-2xl font-semibold mb-4">How can 3D printing revolutionize the automotive industry?</h3>
          <p className="text-gray-600">With 3D printing, automotive parts are being created more efficiently. Is this the future?</p>
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

        <div className="bg-white text-gray-800 shadow-md rounded-lg p-6 mb-6 transform hover:scale-105 transition-transform duration-300 hover:shadow-xl">
          <h3 className="text-2xl font-semibold mb-4">What are the advancements in renewable energy for electrical grids?</h3>
          <p className="text-gray-600">Electrical grids are becoming smarter and more efficient with renewable energy integration. Thoughts?</p>
          <div className="flex items-center space-x-4 mt-4 text-gray-500">
            <span onClick={() => handleUpvote(3)} className="cursor-pointer flex items-center">
              <FaThumbsUp className="mr-2" /> {upvotes[3]} Upvotes
            </span>
            <span onClick={() => handleComment(3)} className="cursor-pointer flex items-center">
              <FaComment className="mr-2" /> {comments[3]} Comments
            </span>
            <span onClick={() => handleShare(3)} className="cursor-pointer flex items-center">
              <FaShare className="mr-2" /> Share
            </span>
          </div>
        </div>


        <div className="bg-white text-gray-800 shadow-md rounded-lg p-6 mb-6 transform hover:scale-105 transition-transform duration-300 hover:shadow-xl">
          <h3 className="text-2xl font-semibold mb-4">Will AI completely replace software engineers?</h3>
          <p className="text-gray-600">With AI tools becoming more sophisticated, is the role of a software engineer at risk?</p>
          <div className="flex items-center space-x-4 mt-4 text-gray-500">
            <span onClick={() => handleUpvote(4)} className="cursor-pointer flex items-center">
              <FaThumbsUp className="mr-2" /> {upvotes[4]} Upvotes
            </span>
            <span onClick={() => handleComment(4)} className="cursor-pointer flex items-center">
              <FaComment className="mr-2" /> {comments[4]} Comments
            </span>
            <span onClick={() => handleShare(4)} className="cursor-pointer flex items-center">
              <FaShare className="mr-2" /> Share
            </span>
          </div>
        </div>

        <div className="bg-white text-gray-800 shadow-md rounded-lg p-6 mb-6 transform hover:scale-105 transition-transform duration-300 hover:shadow-xl">
          <h3 className="text-2xl font-semibold mb-4">How is 5G impacting aviation communication systems?</h3>
          <p className="text-gray-600">5G networks could change aviation systems. How do you see its impact on air traffic control?</p>
          <div className="flex items-center space-x-4 mt-4 text-gray-500">
            <span onClick={() => handleUpvote(5)} className="cursor-pointer flex items-center">
              <FaThumbsUp className="mr-2" /> {upvotes[5]} Upvotes
            </span>
            <span onClick={() => handleComment(5)} className="cursor-pointer flex items-center">
              <FaComment className="mr-2" /> {comments[5]} Comments
            </span>
            <span onClick={() => handleShare(5)} className="cursor-pointer flex items-center">
              <FaShare className="mr-2" /> Share
            </span>
          </div>
        </div>


        <div className="bg-white text-gray-800 shadow-md rounded-lg p-6 mb-6 transform hover:scale-105 transition-transform duration-300 hover:shadow-xl">
          <h3 className="text-2xl font-semibold mb-4">What are the latest trends in green chemistry?</h3>
          <p className="text-gray-600">Green chemistry focuses on reducing hazardous substances. Which innovations do you find most exciting?</p>
          <div className="flex items-center space-x-4 mt-4 text-gray-500">
            <span onClick={() => handleUpvote(6)} className="cursor-pointer flex items-center">
              <FaThumbsUp className="mr-2" /> {upvotes[6]} Upvotes
            </span>
            <span onClick={() => handleComment(6)} className="cursor-pointer flex items-center">
              <FaComment className="mr-2" /> {comments[6]} Comments
            </span>
            <span onClick={() => handleShare(6)} className="cursor-pointer flex items-center">
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
          sticky
          overflow-y-auto
          h-screen
          bg-white text-gray-800 
          w-64 
          p-6 
          shadow-lg 
          fixed 
          inset-y-0 
          right-0 
          transform 
          ${isRightSidebarOpen ? 'translate-x-0' : 'translate-x-full'} 
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
            <a href="/post1" className="flex items-center space-x-3 hover:underline hover:text-red-500 transition-colors">
              <FaFire />
              <span>Australian NRI moving to Hyderabad</span>
            </a>
          </li>
          <li>
            <a href="/post2" className="flex items-center space-x-3 hover:underline hover:text-red-500 transition-colors">
              <FaFire />
              <span>Is it wrong for a woman to look for a well-settled guy in an arranged marriage?</span>
            </a>
          </li>
          <li>
            <a href="/post3" className="flex items-center space-x-3 hover:underline hover:text-red-500 transition-colors">
              <FaFire />
              <span>How to manage career growth while working in AI/ML?</span>
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
