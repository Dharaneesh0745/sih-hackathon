import React, { useState, useEffect } from "react";
import { CourseDetailsCard } from "../../data/CourseData";
import { useParams } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa"; // Import React icons

const CourseViewLesson = () => {
  const { id } = useParams();
  const course = CourseDetailsCard.find((course) => course.u_id === id);

  // State to manage selected video, chapter, feedback, and sidebar
  const [selectedVideo, setSelectedVideo] = useState("");
  const [selectedVideoTitle, setSelectedVideoTitle] = useState(""); // New state for selected video title
  const [selectedChapter, setSelectedChapter] = useState(0); // Start with the first chapter
  const [feedback, setFeedback] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State for sidebar toggle

  // Load the first chapter's video when the component mounts
  useEffect(() => {
    if (course && course.Lessons.length > 0) {
      setSelectedVideo(course.Lessons[0].content[0].video_url);
      setSelectedVideoTitle(course.Lessons[0].content[0].title);
    }
  }, [course]);

  // Handle chapter click to toggle the lesson list and play the first lesson of that chapter
  const handleChapterClick = (index) => {
    setSelectedChapter(index);
    setSelectedVideo(course.Lessons[index].content[0].video_url);
    setSelectedVideoTitle(course.Lessons[index].content[0].title); // Set title on chapter click
  };

  // Handle video click to change the video being played
  const handleVideoClick = (video_url, title) => {
    setSelectedVideo(video_url);
    setSelectedVideoTitle(title); // Set the title of the playing video
  };

  // Toggle sidebar open/close
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col lg:flex-row-reverse h-screen">
      {/* Sidebar with Course Chapters on the right side */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-16"
        } bg-blue-900 text-white p-4 h-full space-y-4 transition-all duration-300 z-40 fixed right-0`}
        style={{ overflowX: "hidden" }}
      >
        <div className="flex justify-between items-center mb-4">
          <h1
            className={`text-xl font-bold transition-all duration-300 ${
              isSidebarOpen ? "block" : "hidden"
            }`}
          >
            {course.name}
          </h1>
          {/* Sidebar Toggle Button next to course name */}
          <button
            className="text-white bg-gray-700 p-2 rounded-full"
            onClick={toggleSidebar}
          >
            {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>

        {isSidebarOpen && (
          <>
            <h2 className="text-lg font-semibold mb-2">Course Contents</h2>
            {course.Lessons.map((lesson, index) => (
              <div key={index}>
                <button
                  className={`w-full text-left p-2 mb-2 bg-blue-700 hover:bg-blue-600 rounded-lg transition-all duration-300 ${
                    selectedChapter === index ? "bg-blue-600" : ""
                  }`}
                  onClick={() => handleChapterClick(index)}
                >
                  {lesson.chapter}
                </button>
                {selectedChapter === index && (
                  <div className="ml-4 mt-2 space-y-2">
                    {lesson.content.map((content) => (
                      <button
                        key={content.id}
                        onClick={() =>
                          handleVideoClick(content.video_url, content.title)
                        }
                        className={`w-full text-left p-2 rounded-lg transition-all duration-300 ${
                          selectedVideo === content.video_url
                            ? "bg-green-500 text-white font-bold" // Highlight the playing video
                            : "bg-blue-800 text-gray-300 hover:bg-blue-500"
                        }`}
                      >
                        {content.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </>
        )}
      </div>

      {/* Video Player Section on the left */}
      <div
        className={`flex-1 p-6 bg-gray-100 flex flex-col justify-center items-center transition-all duration-300 ${
          isSidebarOpen ? "lg:pr-72" : "lg:pr-16"
        }`}
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          {/* Now Playing: {course.Lessons[selectedChapter].chapter} -{" "}
          {selectedVideoTitle} */}
          <br />
          <br />
        </h2>
        {selectedVideo ? (
          <div className="w-full max-w-4xl h-auto transition-all duration-300">
            <iframe
              className="w-full h-[300px] lg:h-[500px] rounded-lg shadow-lg"
              src={selectedVideo}
              title="Video Player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <p className="text-lg text-gray-600">Please select a video to play</p>
        )}

        {/* Feedback Form */}
        <div className="mt-6 w-full lg:w-3/4 bg-white p-4 mb-10 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">
            Leave a Review or Feedback
          </h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Feedback submitted!");
            }}
          >
            <textarea
              className="w-full p-2 border border-gray-300 rounded-lg mb-2"
              placeholder="Enter your feedback here..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-all duration-300"
            >
              Submit Feedback
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CourseViewLesson;
