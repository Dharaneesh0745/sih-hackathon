import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "../../server";
import styles from "../../styles/styles";
import { FaCoins } from "react-icons/fa6";
import { MdAdd } from "react-icons/md";
import { BiMessageDetail } from "react-icons/bi";
import Loader from "../Layouts/Loader";
import html2pdf from "html2pdf.js";

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${server}/user/view-user/${id}`);
        const data = await response.json();
        if (data.success) {
          setUser(data.view_user);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError("An error occurred while fetching the user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  const handleDownloadResume = () => {
    const resumeElement = document.querySelector(".resume-container");

    const opt = {
      margin: 0.5,
      filename: "resume.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf()
      .from(resumeElement)
      .set(opt)
      .save();
  };

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div>User Not Found</div>;
  }

  return (
    <div>
      {user ? (
        <>
          {/* Download Resume Button */}

          {/* Resume Content */}
          <div className="resume-container">
            <div className="800px:block hidden">
              <div className="m-5 rounded-xl bg-gray-300 h-screen">
                <div className="w-[28%] m-3 absolute overflow-y-scroll rounded-lg h-[97vh]">
                  <div className="relative">
                    <button
                      onClick={handleDownloadResume}
                      className={`${styles.button} text-white mx-auto mb-4`}
                    >
                      Download Resume
                    </button>
                    <img
                      src={`${user.avatar}`}
                      alt="profile"
                      className="w-40 h-40 rounded-full m-5 mx-auto items-center"
                    />
                    <span className="absolute right-[120px] bottom-0">
                      <img src="/subs.png" alt="" className="h-16 w-16" />
                    </span>
                  </div>
                  <div className="text-center">
                    <h1 className="text-2xl font-bold">
                      {user.firstName} {user.lastName}
                    </h1>
                    <p className="text-sm">
                      Full-Stack Developer | ML Engineer
                    </p>
                    <p className="text-sm">Coimbatore, India</p>
                    <div className="flex flex-row">
                      <button className={`${styles.button} text-white mx-auto`}>
                        Follow &nbsp; <MdAdd className="mt-0.5" />
                      </button>
                      <button className={`${styles.button} text-white mx-auto`}>
                        Message &nbsp; <BiMessageDetail className="mt-1" />
                      </button>
                    </div>
                    <button
                      className={`${styles.buttonOutline} w-[80%] mx-auto`}
                    >
                      Total points earned: &nbsp;&nbsp;{" "}
                      <FaCoins className="text-yellow-500" /> &nbsp; 1200 points
                    </button>
                  </div>
                  <div className="text-center mt-7 items-center mx-auto">
                    <h1 className="text-2xl font-bold">Current Shield</h1>
                    <img
                      src="/shield.png"
                      alt=""
                      className="h-40 w-40 mx-auto"
                    />
                  </div>
                  <div className="mt-16 relative">
                    <hr className="h-1 bg-red-700 mx-5" />
                    <div className="flex flex-row justify-between absolute gap-[73px] -top-1 mx-5">
                      <span className="bg-green-500 h-1 p-2 -top-1 -left-1 rounded-full"></span>
                      <span className="bg-green-500 h-1 p-2 -top-1 left-0 rounded-full"></span>
                      <span className="bg-green-500 h-1 p-2 -top-1 left-0 rounded-full"></span>
                      <span className="bg-green-500 h-1 p-2 -top-1 left-0 rounded-full"></span>
                      <span className="bg-green-500 h-1 p-2 -top-1 -right-1 rounded-full"></span>
                    </div>
                    <div className="flex flex-row text-sm justify-between absolute gap-[55px] mx-5 top-5">
                      <span>1000</span>
                      <span>2000</span>
                      <span>3000</span>
                      <span>4000</span>
                      <span>5000</span>
                    </div>
                  </div>
                  <div className="bg-red-300 h-20 mt-16 mx-5 rounded-lg"></div>
                </div>
                <div className="w-[67%] absolute rounded-lg right-5 bg-white h-[97vh] m-3 p-6 overflow-y-scroll">
                  {/* Technical Skills */}
                  <div className="mb-8">
                    <h2 className="text-xl font-bold mb-4">Technical Skills</h2>
                    <div className="flex flex-wrap">
                      {user.technicalSkills.split(",").map((skill, index) => (
                        <span
                          key={index}
                          className="flex items-center bg-gray-200 rounded-md p-2 mr-2 mb-2"
                        >
                          {skill.trim()}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Non-Technical Skills */}
                  <div className="mb-8">
                    <h2 className="text-xl font-bold mb-4">
                      Non-Technical Skills
                    </h2>
                    <div className="flex flex-wrap">
                      {user.nonTechnicalSkills
                        .split(",")
                        .map((skill, index) => (
                          <span
                            key={index}
                            className="flex items-center bg-gray-200 rounded-md p-2 mr-2 mb-2"
                          >
                            {skill.trim()}
                          </span>
                        ))}
                    </div>
                  </div>

                  {/* Education Details */}
                  <div className="mb-8">
                    <h2 className="text-xl font-bold mb-4">Education</h2>
                    <ul>
                      {user.education.map((edu, index) => (
                        <li
                          key={index}
                          className="mb-4 p-4 bg-gray-100 rounded-lg shadow-md"
                        >
                          <h3 className="text-lg font-semibold">
                            {edu.degree}
                          </h3>
                          <p>
                            {edu.universityName} - {edu.graduationYear}
                          </p>
                          <p>Field of Study: {edu.fieldOfStudy}</p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Experience */}
                  <div className="mb-8">
                    <h2 className="text-xl font-bold mb-4">Experience</h2>
                    <ul>
                      {user.experience.map((exp, index) => (
                        <li
                          key={index}
                          className="mb-4 p-4 bg-gray-100 rounded-lg shadow-md"
                        >
                          <h3 className="text-lg font-semibold">{exp.role}</h3>
                          <p>
                            {exp.company} - {exp.duration}
                          </p>
                          <p>{exp.description}</p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Achievements */}
                  <div className="mb-8">
                    <h2 className="text-xl font-bold mb-4">Achievements</h2>
                    <ul>
                      {user.achievements.map((achieve, index) => (
                        <li
                          key={index}
                          className="mb-4 p-4 bg-gray-100 rounded-lg shadow-md"
                        >
                          <h3 className="text-lg font-semibold">
                            {achieve.certificateName}
                          </h3>
                          <p>{achieve.issuingAuthority}</p>
                          <p>Issued on: {achieve.issueDate}</p>
                          <p>Skills Acquired: {achieve.skillsAcquired}</p>
                          {achieve.image && (
                            <img
                              src={achieve.image}
                              alt="Achievement"
                              className="mt-2 w-full h-auto rounded-md"
                            />
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Projects */}
                  <div className="mb-8">
                    <h2 className="text-xl font-bold mb-4">Projects</h2>
                    <ul>
                      {user.projects.map((proj, index) => (
                        <li
                          key={index}
                          className="mb-4 p-4 bg-gray-100 rounded-lg shadow-md"
                        >
                          <h3 className="text-lg font-semibold">{proj.name}</h3>
                          <p>Theme: {proj.theme}</p>
                          <p>Domain: {proj.domain}</p>
                          <p>
                            Duration: {proj.startDate} -{" "}
                            {proj.currentlyWorking ? "Present" : proj.endDate}
                          </p>
                          <p>Skills Acquired: {proj.skillsAcquired}</p>
                          <p>Description: {proj.description}</p>
                          {proj.image && (
                            <img
                              src={proj.image}
                              alt="Project"
                              className="mt-2 w-full h-auto rounded-md"
                            />
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div>No user found</div>
      )}
    </div>
  );
};

export default UserDetail;
