import React from "react";

const ResumeTemplate = ({ user }) => {
  return (
    <div className="p-8 max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      <div className="flex items-center mb-8">
        <img
          src={user.avatar}
          alt="Profile"
          className="w-24 h-24 rounded-full mr-4"
        />
        <div>
          <h1 className="text-2xl font-bold">
            {user.firstName} {user.lastName}
          </h1>
          <p className="text-lg">{user.profession}</p>
          <p className="text-sm text-gray-600">{user.location}</p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Technical Skills</h2>
        <div className="flex flex-wrap">
          {user.technicalSkills.split(",").map((skill, index) => (
            <span key={index} className="bg-gray-200 rounded-md p-2 mr-2 mb-2">
              {skill.trim()}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Non-Technical Skills</h2>
        <div className="flex flex-wrap">
          {user.nonTechnicalSkills.split(",").map((skill, index) => (
            <span key={index} className="bg-gray-200 rounded-md p-2 mr-2 mb-2">
              {skill.trim()}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Education</h2>
        {user.education.map((edu, index) => (
          <div
            key={index}
            className="mb-4 p-4 bg-gray-100 rounded-lg shadow-md"
          >
            <h3 className="text-lg font-semibold">{edu.degree}</h3>
            <p>
              {edu.universityName} - {edu.graduationYear}
            </p>
            <p>Field of Study: {edu.fieldOfStudy}</p>
          </div>
        ))}
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Experience</h2>
        {user.experience.map((exp, index) => (
          <div
            key={index}
            className="mb-4 p-4 bg-gray-100 rounded-lg shadow-md"
          >
            <h3 className="text-lg font-semibold">{exp.role}</h3>
            <p>
              {exp.company} - {exp.duration}
            </p>
            <p>{exp.description}</p>
          </div>
        ))}
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Achievements</h2>
        {user.achievements.map((achieve, index) => (
          <div
            key={index}
            className="mb-4 p-4 bg-gray-100 rounded-lg shadow-md"
          >
            <h3 className="text-lg font-semibold">{achieve.certificateName}</h3>
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
          </div>
        ))}
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Projects</h2>
        {user.projects.map((proj, index) => (
          <div
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResumeTemplate;
