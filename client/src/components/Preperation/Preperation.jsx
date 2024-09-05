import React, { useState } from "react";
import { FaClock, FaGraduationCap } from "react-icons/fa";

const Preperation = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const interviewsData = [
    {
      title: "Mechanical Engineering",
      company: "ABC Industries",
      image:
        "https://images.ctfassets.net/szez98lehkfm/52B8oUgU4y22oej7g3IxjP/d64205fc23e5cb739c140d0609b67a01/MyIC_Article_92506",
      duration: "45 mins",
    },
    {
      title: "Electrical Engineering",
      company: "XYZ Corp",
      image:
        "https://www.excelsior.edu/wp-content/uploads/2022/06/GettyImages-1319077259_Blog_1000x568-1000x568.jpeg",
      duration: "60 mins",
    },
    {
      title: "Civil Engineering",
      company: "BuildRight",
      image:
        "https://idreamcareer.com/wp-content/uploads/2023/04/Career-in-Civil-Engineering.webp",
      duration: "50 mins",
    },
    {
      title: "Software Engineering",
      company: "TechWave",
      image:
        "https://d3kqdc25i4tl0t.cloudfront.net/articles/content/517_240659_tech.hero.jpg",
      duration: "30 mins",
    },
    {
      title: "Chemical Engineering",
      company: "ChemPro",
      image:
        "https://images.interestingengineering.com/img/iea/QjOd9rbaGd/chem-engineers.jpg",
      duration: "55 mins",
    },
    {
      title: "Aerospace Engineering",
      company: "SkyHigh",
      image:
        "https://media.foundit.in/career-advice/wp-content/uploads/2023/09/795-x-285-17-min.jpg",
      duration: "70 mins",
    },
    {
      title: "Biomedical Engineering",
      company: "HealthTech",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBSyharMx-MeGAF_3MeRCaMD1RlaA5kQ5njQ&s",
      duration: "40 mins",
    },
    {
      title: "Environmental Engineering",
      company: "EcoWorld",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMREc98Wfd7KJASa6CoC5ms1P5RL2dCYslH1RBw2PO8iP4LnsiUy_hlwlFCihtxhmIc6M&usqp=CAU",
      duration: "50 mins",
    },
    {
      title: "AI Engineering",
      company: "EcoWorld",
      image:
        "https://businesstoys.in/assets/blog/what-is-ai-engineering-job-roles-of-an-ai-engineer/main.png",
      duration: "50 mins",
    },
    {
      title: "ML Engineering",
      company: "EcoWorld",
      image:
        "https://media.licdn.com/dms/image/D5612AQHIC_oaQHsnNg/article-cover_image-shrink_720_1280/0/1678249146766?e=2147483647&v=beta&t=PgdX_dPDGLm5U9XBzMSmBJ_y-lPQNoegVQ_lSp5d1q8",
      duration: "50 mins",
    },
    {
      title: "AIDS Engineering",
      company: "EcoWorld",
      image: "https://dhaanish.in/wp-content/uploads/2021/05/aidsdace-min.jpg",
      duration: "50 mins",
    },
  ];

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredInterviews = interviewsData.filter((interview) =>
    interview.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastInterview = currentPage * itemsPerPage;
  const indexOfFirstInterview = indexOfLastInterview - itemsPerPage;
  const currentInterviews = filteredInterviews.slice(
    indexOfFirstInterview,
    indexOfLastInterview
  );

  const totalPages = Math.ceil(filteredInterviews.length / itemsPerPage);

  const handlePageChange = (direction) => {
    setCurrentPage((prev) => prev + direction);
  };

  return (
    <>
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 pt-[80px]">
            <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
              Engineering Interview Preparation
            </h1>
            <input
              type="text"
              placeholder="Search for an interview..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentInterviews.map((interview, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl duration-300"
              >
                <img
                  src={interview.image}
                  alt={interview.title}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h2 className="text-xl font-semibold mb-2 text-center text-gray-800">
                  {interview.title}
                </h2>
                <p className="text-center text-gray-600 mb-4">
                  {interview.company}
                </p>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  <p className="text-gray-600">
                    <FaClock className="inline-block mr-1 text-gray-500" />
                    {interview.duration}
                  </p>
                  <p className="text-gray-600">
                    <FaGraduationCap className="inline-block mr-1 text-green-500" />
                    Engineering
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <button
              onClick={() => handlePageChange(-1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="mx-4 self-center text-lg font-semibold text-gray-700">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(1)}
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

export default Preperation;
