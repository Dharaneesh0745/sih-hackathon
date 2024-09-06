import React, { useEffect, useState } from "react";
// import { backend_API_endpoint } from "../../server";
import { useSelector } from "react-redux";
import { AiOutlineCamera } from "react-icons/ai";
import styles from "../../styles/styles";
// import { DataGrid } from "@material-ui/data-grid";
import { backend_API_endpoint, bot_API_endpoint, server } from "../../server";
import axios from "axios";
import { toast } from "react-toastify";
import { RiSparkling2Fill } from "react-icons/ri";
import "../../styles/Roadmap.css";

// // Function to format the response text dynamically
// const formatResponse = (text) => {
//   // Replace '**' for bold, '*' for italics, and '##' for headings, and '\n' for line breaks
//   const formattedText = text
//     .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Bold
//     .replace(/\*(.*?)\*/g, "<em>$1</em>") // Italics
//     .replace(/##(.*?)##/g, "<h3>$1</h3>") // Headings
//     .replace(/\n/g, "<br />"); // Line breaks
//   return formattedText;
// };

// // FetchAPI component that fetches the roadmap
// const FetchAPI = ({ userQuery }) => {
//   const [response, setResponse] = useState("Fetching roadmap...");

//   useEffect(() => {
//     if (userQuery) {
//       axios
//         .post(`${bot_API_endpoint}/bot/chatBot`, { prompt: userQuery })
//         .then((res) => {
//           const formattedText = formatResponse(res.data.text);
//           setResponse(formattedText);
//         })
//         .catch(() => {
//           setResponse(
//             "Sorry, something went wrong while fetching the roadmap."
//           );
//         });
//     }
//   }, [userQuery]);

//   return <div dangerouslySetInnerHTML={{ __html: response }} />;
// };

// Function to format the response text dynamically
const formatResponse = (text) => {
  // Format based on your needs, assuming the API returns steps or stages
  return text
    .split("\n")
    .map((line, index) => ({
      id: index,
      text: line.trim(),
    }))
    .filter((step) => step.text !== "");
};

// FetchAPI component that fetches the roadmap
const FetchAPI = ({ userQuery, userId }) => {
  const [steps, setSteps] = useState([]);
  // console.log(userQuery);
  useEffect(() => {
    if (userQuery) {
      axios
        .post(`${bot_API_endpoint}/bot/chatBot`, { prompt: userQuery })
        .then((res) => {
          console.log(res.data.text);
          axios
            .post(`${server}/user/update-roadmap/${userId}`, {
              roadMapData: res.data.text,
            })
            .then((res) => {
              toast.success(res);
            });
          const formattedSteps = formatResponse(res.data.text);
          setSteps(formattedSteps);
        })
        .catch(() => {
          setSteps([
            {
              id: 0,
              text: "Sorry, something went wrong while fetching the roadmap.",
            },
          ]);
        });
    }
  }, [userQuery]);

  return (
    <div className="roadmap-container">
      {steps.length > 0 &&
        steps.map((step, index) => (
          <div key={step.id} className="roadmap-step">
            <div className="step-content">
              <div className="step-number">{index + 1}</div>
              <div className="step-text">{step.text}</div>
            </div>
            {index !== steps.length - 1 && <div className="connector"></div>}
          </div>
        ))}
    </div>
  );
};

const ProfileContent = ({ active }) => {
  const { user } = useSelector((state) => state.user);
  const id = user._id;
  const [firstName, setFirstName] = useState(user && user.firstName);
  const [lastName, setLastName] = useState(user && user.lastName);
  const [email, setEmail] = useState(user && user.email);
  const [recoveryEmail, setRecoveryEmail] = useState(
    user && user.recoveryEmail
  );
  const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
  const [dateOfBirth, setDateOfBirth] = useState(user && user.dateOfBirth);
  const [gender, setGender] = useState(user && user.gender);
  const [country, setCountry] = useState(user && user.country);
  const [city, setCity] = useState(user && user.city);
  const [state, setState] = useState(user && user.state);
  const [address1, setAddress1] = useState(user && user.address1);
  const [preferredJobRole, setPreferredJobRole] = useState(
    user && user.preferredJobRole
  );
  const [zipCode, setZipCode] = useState(user && user.zipCode);
  const [addressType, setAddressType] = useState(user && user.addressType);

  const [userQuery, setUserQuery] = useState("");

  const primaryDetailsSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(
        `${server}/user/update-primary-details/${id}`,
        {
          firstName,
          lastName,
          email,
          recoveryEmail,
          phoneNumber,
          dateOfBirth,
          gender,
          country,
          city,
          state,
          address1,
          preferredJobRole,
          zipCode,
          addressType,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Primary Details Updated Successfully!");
      })
      .catch((err) => {
        toast.error(err.response.data.messages);
      });
  };

  const TECHNICAL_ROLES = [
    "Software Developer",
    "System Administrator",
    "Network Engineer",
    "DevOps Engineer",
    "Data Scientist",
    "Security Analyst",
    "Database Administrator",
    "IT Support Specialist",
    "Front-End Developer",
    "Back-End Developer",
    "Full-Stack Developer",
    "Machine Learning Engineer",
    "Artificial Intelligence Engineer",
    "Cloud Engineer",
    "Big Data Engineer",
    "Business Intelligence Analyst",
    "Data Analyst",
    "Data Engineer",
    "Site Reliability Engineer",
    "Cybersecurity Specialist",
    "Penetration Tester",
    "Ethical Hacker",
    "IT Project Manager",
    "Systems Analyst",
    "Quality Assurance Engineer",
    "Software Tester",
    "Embedded Systems Engineer",
    "Game Developer",
    "Mobile App Developer",
    "Web Developer",
    "UX/UI Designer",
    "Technical Architect",
    "Technical Writer",
    "Hardware Engineer",
    "Network Administrator",
    "IT Consultant",
    "Technology Evangelist",
    "IT Manager",
    "Virtualization Engineer",
    "Blockchain Developer",
    "Robotics Engineer",
    "Systems Integrator",
    "IT Director",
    "Database Developer",
    "Systems Engineer",
    "IT Operations Manager",
    "CRM Developer",
    "ERP Consultant",
    "Data Warehouse Architect",
    "Digital Transformation Consultant",
    "Voice User Interface Designer",
    "Augmented Reality Developer",
    "Virtual Reality Developer",
    "AI Research Scientist",
    "Bioinformatics Specialist",
    "Information Systems Manager",
    "E-commerce Specialist",
    "SAP Consultant",
    "IT Auditor",
    "IT Risk Manager",
    "Telecommunications Engineer",
    "Technical Support Engineer",
    "RPA Developer",
    "Network Security Engineer",
    "IoT Engineer",
    "Enterprise Architect",
    "Infrastructure Engineer",
    "Application Support Analyst",
    "Solutions Architect",
    "IT Trainer",
    "Cloud Solutions Architect",
    "Systems Administrator",
    "Data Privacy Officer",
    "IT Governance Specialist",
    "Penetration Testing Specialist",
    "Technical Product Manager",
    "Chief Information Officer (CIO)",
    "Chief Technology Officer (CTO)",
    "JavaScript",
    "Python",
    "Java",
    "C#",
    "C++",
    "Ruby",
    "PHP",
    "Swift",
    "Kotlin",
    "Go",
    "TypeScript",
    "R",
    "SQL",
    "HTML",
    "CSS",
    "Objective-C",
    "Dart",
    "Scala",
    "Perl",
    "Haskell",
    "Lua",
    "Groovy",
    "Rust",
    "MATLAB",
    "Shell",
    "PowerShell",
    "Erlang",
    "Elixir",
    "Clojure",
    "F#",
    "Visual Basic",
    "ActionScript",
    "NumPy",
    "Pandas",
    "Matplotlib",
    "SciPy",
    "TensorFlow",
    "Keras",
    "PyTorch",
    "Scikit-learn",
    "Django",
    "Flask",
    "FastAPI",
    "BeautifulSoup",
    "Scrapy",
    "Requests",
    "SQLAlchemy",
    "Pillow",
    "OpenCV",
    "NLTK",
    "SpaCy",
    "Pytest",
    "Jupyter",
    "Pygame",
    "SymPy",
    "Bokeh",
    "Plotly",
    "Dash",
    "Celery",
    "Alembic",
    "Gunicorn",
    "Pydantic",
    "Selenium",
    "PyTorch Lightning",
    "CuPy",
    "h5py",
    "Theano",
    "PyArrow",
    "Paramiko",
    "pyodbc",
    "asyncio",
    "Loguru",
    "Pandas-Profiling",
    "React",
    "Vue.js",
    "Angular",
    "jQuery",
    "D3.js",
    "Lodash",
    "Moment.js",
    "Axios",
    "Express",
    "Node.js",
    "Three.js",
    "Echarts",
    "Chart.js",
    "Redux",
    "Next.js",
    "Gatsby",
    "Svelte",
    "Electron",
    "Bootstrap",
    "Tailwind CSS",
    "Socket.IO",
    "TypeORM",
    "Knex",
    "Sequelize",
    "Mongoose",
    "NestJS",
    "Apollo Client",
    "GraphQL",
    "Jest",
    "Mocha",
    "Chai",
    "Sinon",
    "Webpack",
    "Parcel",
    "Rollup",
    "Spring Framework",
    "Hibernate",
    "Apache Commons",
    "Guava",
    "Log4j",
    "JUnit",
    "Mockito",
    "Apache Kafka",
    "Apache POI",
    "Jackson",
    "Gson",
    "JavaFX",
    "Jersey",
    "SLF4J",
    "Thymeleaf",
    "Vaadin",
    "JPA (Java Persistence API)",
    "JBoss",
    "Dropwizard",
    "Quartz",
    "Netty",
    "Java Mail API",
    "Java Servlet API",
    "Jasypt",
    "Apache Camel",
    "Boost",
    "Qt",
    "Eigen",
    "Poco",
    "OpenCV",
    "Boost.Asio",
    "Caffe",
    "TensorFlow",
    "OpenGL",
    "SFML",
    "GTest",
    "ACE (Adaptive Communicative Environment)",
    "Blosc",
    "libcurl",
    "RapidJSON",
    "Crypto++",
    "TBB (Threading Building Blocks)",
    "CGAL (Computational Geometry Algorithms Library)",
    "Ogre3D",
    "Rails (Ruby on Rails)",
    "Sinatra",
    "RSpec",
    "Capybara",
    "Puma",
    "Sidekiq",
    "Devise",
    "ActiveRecord",
    "Nokogiri",
    "Faraday",
    "CarrierWave",
    "Paperclip",
    "Hanami",
    "OmniAuth",
    "Prawn",
    "ActiveAdmin",
    "Rubocop",
    "Sequel",
    "Laravel",
    "Symfony",
    "CodeIgniter",
    "Zend Framework",
    "CakePHP",
    "Slim",
    "Phalcon",
    "Guzzle",
    "Monolog",
    "Twig",
    "Doctrine ORM",
    "Pusher",
    "Faker",
    "PHPUnit",
    "Mailgun",
    "SwiftMailer",
    "GuzzleHTTP",
    "Socialite",
    "ASP.NET Core",
    "Entity Framework Core",
    "NUnit",
    "xUnit",
    "Serilog",
    "AutoMapper",
    "Dapper",
    "MediatR",
    "SignalR",
    "RestSharp",
    "Hangfire",
    "Quartz.NET",
    "NLog",
    "Castle Windsor",
    "MassTransit",
    "FluentValidation",
    "Swagger",
    "Accord.NET",
    "ML.NET",
    "SwiftUI",
    "Alamofire",
    "RxSwift",
    "Combine",
    "CoreData",
    "Realm",
    "SnapKit",
    "PromiseKit",
    "Kingfisher",
    "SwiftyJSON",
    "Moya",
    "Charts",
    "Firebase",
    "CocoaPods",
    "Swinject",
    "Fabric",
    "Quick",
    "Nimble",
    "Gin",
    "Echo",
    "Beego",
    "Revel",
    "Gorm",
    "Mgo",
    "Viper",
    "Cobra",
    "Go-kit",
    "Go-Redis",
    "Ginkgo",
    "Gomega",
    "Chi",
    "Httprouter",
    "Zap",
    "Logrus",
    "Go-metrics",
    "Go-Sqlite3",
    "Go-MySQL",
    "Go-Postgres",
    "Go-AWS-SDK",
    "GraphQL-Go",
    "Akka",
    "Play Framework",
    "Spark",
    "Slick",
    "Cats",
    "Scalaz",
    "Alpakka",
    "Lagom",
    "Apache Flink",
    "Doobie",
    "Http4s",
    "Circe",
    "Monix",
    "Shapeless",
    "SBT (Simple Build Tool)",
    "ScalaTest",
    "ScalaCheck",
    "Breeze",
    "Kamon",
    "Actix",
    "Rocket",
    "Diesel",
    "Serde",
    "Tokio",
    "Hyper",
    "Reqwest",
    "Clap",
    "Tide",
    "Rust-async",
    "Warp",
    "SeaORM",
    "Slog",
    "Rustfmt",
    "MIO",
    "Regex",
    "Rust-Postgres",
    "OpenSSL",
    "ggplot2",
    "dplyr",
    "tidyr",
    "shiny",
    "lubridate",
    "caret",
    "plotly",
    "data.table",
    "readr",
    "knitr",
    "rmarkdown",
    "httr",
    "stringr",
    "rJava",
    "tensorflow",
    "xgboost",
    "randomForest",
    "e1071",
    "MASS",
    "Matrix",
  ];

  const NON_TECHNICAL_ROLES = [
    "Project Manager",
    "Product Manager",
    "Marketing Manager",
    "Sales Manager",
    "Human Resources Manager",
    "Financial Analyst",
    "Accountant",
    "Customer Service Representative",
    "Administrative Assistant",
    "Executive Assistant",
    "Operations Manager",
    "Business Development Manager",
    "Content Writer",
    "Public Relations Specialist",
    "Event Coordinator",
    "Legal Advisor",
    "Recruiter",
    "Training Specialist",
    "Office Manager",
    "Logistics Coordinator",
    "Supply Chain Manager",
    "Compliance Officer",
    "Data Entry Clerk",
    "Real Estate Agent",
    "Consultant",
    "Brand Manager",
    "Product Designer",
    "Executive Director",
    "Administrative Coordinator",
    "Customer Success Manager",
    "Financial Planner",
    "Investment Banker",
    "Human Resources Specialist",
    "Retail Manager",
    "Business Analyst",
    "Market Research Analyst",
    "Strategic Planner",
    "Sales Representative",
    "Talent Acquisition Specialist",
    "Legal Assistant",
    "Healthcare Administrator",
    "Insurance Agent",
    "Operations Analyst",
    "Training Coordinator",
    "Policy Advisor",
    "Public Affairs Specialist",
    "Editorial Assistant",
    "Creative Director",
    "Communications Manager",
    "Development Officer",
    "Grants Manager",
    "Non-Profit Manager",
    "Fundraiser",
    "Corporate Trainer",
    "Environmental Consultant",
    "Procurement Specialist",
    "Tax Advisor",
    "Employment Specialist",
    "Business Operations Manager",
    "Customer Support Specialist",
    "Administrative Officer",
    "Strategic Partnerships Manager",
    "Investor Relations Manager",
    "Account Manager",
    "Legal Consultant",
    "Merchandising Manager",
    "HR Director",
    "Finance Director",
    "Chief Financial Officer (CFO)",
    "Chief Executive Officer (CEO)",
    "Chief Operating Officer (COO)",
    "Chief Marketing Officer (CMO)",
    "Chief Human Resources Officer (CHRO)",
    "Chief Administrative Officer (CAO)",
    "Chief Revenue Officer (CRO)",
    "Chief Strategy Officer (CSO)",
    "Director of Operations",
    "Director of Marketing",
    "Director of Sales",
    "Director of HR",
    "Director of Finance",
    "Director of Communications",
    "Director of Customer Service",
    "Director of Product Management",
    "Director of Business Development",
    "Director of Administration",
    "Director of Training",
    "Director of Strategy",
    "Director of Legal Affairs",
    "Director of Investor Relations",
    "General Manager",
    "Branch Manager",
    "Regional Manager",
    "Area Manager",
    "Operations Director",
    "Business Unit Manager",
    "Corporate Development Manager",
    "Training and Development Manager",
    "Corporate Communications Manager",
    "Public Relations Manager",
    "Compliance Manager",
    "Risk Manager",
    "Contract Manager",
    "Health and Safety Manager",
    "Facility Manager",
    "Property Manager",
    "Insurance Underwriter",
    "Product Marketing Manager",
    "Event Manager",
    "Sales Director",
    "Financial Controller",
    "Chief Data Officer (CDO)",
    "Chief Technology Officer (CTO)",
    "Chief Product Officer (CPO)",
  ];

  const [inputValueTechnical, setInputValueTechnical] = useState("");
  const [inputValueNonTechnical, setInputValueNonTechnical] = useState("");
  const [technicalSkills, setTechnicalSkills] = useState([]);
  const [nonTechnicalSkills, setNonTechnicalSkills] = useState([]);
  const [filteredTechnicalRoles, setFilteredTechnicalRoles] = useState([]);
  const [filteredNonTechnicalRoles, setFilteredNonTechnicalRoles] = useState(
    []
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [skillToDelete, setSkillToDelete] = useState(null);

  useEffect(() => {
    if (user) {
      try {
        setTechnicalSkills(
          user.technicalSkills ? user.technicalSkills.split(", ") : []
        );
        setNonTechnicalSkills(
          user.nonTechnicalSkills ? user.nonTechnicalSkills.split(", ") : []
        );
      } catch (error) {
        console.error("Error processing skills:", error);
      }
    }
  }, [user]);

  const handleInputChange = (e, type) => {
    const value = e.target.value;
    if (type === "technical") {
      setInputValueTechnical(value);
      setFilteredTechnicalRoles(
        TECHNICAL_ROLES.filter((role) =>
          role.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setInputValueNonTechnical(value);
      setFilteredNonTechnicalRoles(
        NON_TECHNICAL_ROLES.filter((role) =>
          role.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  };

  const handleRoleSelect = (role, type) => {
    if (type === "technical" && !technicalSkills.includes(role)) {
      setTechnicalSkills([...technicalSkills, role]);
    } else if (type === "nonTechnical" && !nonTechnicalSkills.includes(role)) {
      setNonTechnicalSkills([...nonTechnicalSkills, role]);
    }
    if (type === "technical") {
      setInputValueTechnical("");
      setFilteredTechnicalRoles([]);
    } else {
      setInputValueNonTechnical("");
      setFilteredNonTechnicalRoles([]);
    }
  };

  const openDeleteModal = (role, technical) => {
    setSkillToDelete({ role, technical });
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSkillToDelete(null);
  };

  const handleDeleteSkill = async () => {
    const { role, technical } = skillToDelete;
    if (technical) {
      const updatedSkills = technicalSkills.filter((r) => r !== role);
      setTechnicalSkills(updatedSkills);
    } else {
      const updatedSkills = nonTechnicalSkills.filter((r) => r !== role);
      setNonTechnicalSkills(updatedSkills);
    }
    closeDeleteModal();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedTechnicalSkills = technicalSkills.join(", ");
    const updatedNonTechnicalSkills = nonTechnicalSkills.join(", ");

    console.log(updatedTechnicalSkills);

    try {
      await axios.post(`${server}/user/update-skills/${id}`, {
        technicalSkills: updatedTechnicalSkills,
        nonTechnicalSkills: updatedNonTechnicalSkills,
      });
      toast.success("Skills updated successfully!");
    } catch (error) {
      toast.error("Error updating skills:", error);
    }
  };

  const fetchSkillsJobRole = () => {
    // console.log(user);
    // const [skillsRoadMap, setSkillsRoadMap] = useState("");

    // useEffect(() => {
    setUserQuery(
      `Generate a roadmap for my preferred job and skills, just return the languages, libraries step by step nothing else. My Preferred Job Role : 
        ${user.preferredJobRole}
         and my skills are these : 
        ${user.technicalSkills}`
    );
    // console.log(userQuery);

    // console.log(user.preferredJobRole);
    // }, []);
  };

  // Component to display the roadmap data
  const RoadMapDataDisplay = ({ roadMapData }) => {
    // console.log(roadMapData);
    const [dataSteps, setDataSteps] = useState([]);

    useEffect(() => {
      if (roadMapData && roadMapData !== "None") {
        const formattedData = formatResponse(roadMapData);
        setDataSteps(formattedData);
        // console.log(formattedData);
      }
    }, [roadMapData]);

    return (
      <div className="roadmap-container">
        {/* {dataSteps.length > 0 ? (
          dataSteps.map((step, index) => (
            <div key={index} className="roadmap-step">
              <div className="step-content">
                <div className="step-number">{index + 1}</div>
                <div className="step-text">{step.text}</div>
              </div>
              {index !== dataSteps.length - 1 && (
                <div className="connector"></div>
              )}
            </div>
          ))
        ) : (
          <p>No roadmap data available.</p>
        )} */}
        {dataSteps.length > 0 &&
          dataSteps.map((step, index) => (
            <div key={step.id} className="roadmap-step">
              <div className="step-content">
                <div className="step-number">{index + 1}</div>
                <div className="step-text">{step.text}</div>
              </div>
              {index !== dataSteps.length - 1 && (
                <div className="connector"></div>
              )}
            </div>
          ))}
      </div>
    );
  };

  const handleGenerateFunction = () => {
    fetchSkillsJobRole();
  };

  // Handle the scenario when user.roadMapData is "None"
  const renderRoadmapOrSkills = () => {
    if (user.roadMapData !== "None") {
      return (
        <>
          <button
            className={`${styles.button} mx-auto w-auto px-3 text-white`}
            onClick={handleGenerateFunction}
          >
            Generate Roadmap with AI &nbsp; <RiSparkling2Fill />
          </button>
          <FetchAPI userQuery={userQuery} userId={user._id} />
        </>
      );
    } else {
      return <RoadMapDataDisplay roadMapData={user.roadMapData} />;
    }
  };

  return (
    <>
      <div className="w-full">
        {/* profile page */}
        {active === 1 && (
          <>
            <div className="flex justify-center w-full">
              <div className="relative">
                <img
                  src={`${backend_API_endpoint}${user.avatar}`}
                  className="w-[150px] h-[150px] 800px:-mb-0 -mb-7 ml-14 rounded-full object-cover border-[3px] border-[#3ad132]"
                  alt=""
                />
                <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
                  <AiOutlineCamera />
                </div>
              </div>
            </div>
            <br />
            <br />

            {/* User Primary Details */}
            <div className="w-full pr-8 bg-slate-300 mr-5 py-8 rounded-xl mx-8">
              <h1 className="mb-4 text-center mx-auto ml-7 text-black font-bold text-[30px]">
                Primary Details
              </h1>
              <form onSubmit={primaryDetailsSubmit} aria-required={true}>
                <div className="w-full 800px:flex pl-9 block pb-3">
                  <div className="w-[100%] 800px:w-[50%] mr-10">
                    <label className="block pb-2">First Name</label>
                    <input
                      type="text"
                      className={`${styles.input}!w-[95%] rounded-lg`}
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className=" w-[100%] 800px:w-[50%]">
                    <label className="block pb-2">Last Name</label>
                    <input
                      type="text"
                      className={`${styles.input}!w-[95%] rounded-lg`}
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full 800px:flex pl-9 block pb-3">
                  <div className=" w-[100%] 800px:w-[50%] mr-10">
                    <label className="block pb-2">Email Address</label>
                    <input
                      type="email"
                      className={`${styles.input}!w-[95%] rounded-lg cursor-not-allowed`}
                      required
                      disabled
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className=" w-[100%] 800px:w-[50%]">
                    <label className="block pb-2">Recovery Email</label>
                    <input
                      type="email"
                      className={`${styles.input}!w-[95%] rounded-lg`}
                      required
                      value={recoveryEmail}
                      onChange={(e) => setRecoveryEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full 800px:flex pl-9 block pb-3">
                  <div className=" w-[100%] 800px:w-[50%] mr-10">
                    <label className="block pb-2">Phone Number</label>
                    <input
                      type="number"
                      className={`${styles.input}!w-[95%] rounded-lg`}
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                  <div className=" w-[100%] 800px:w-[50%]">
                    <label className="block pb-2">Date of Birth</label>
                    <input
                      type="date"
                      className={`${styles.input}!w-[95%] rounded-lg`}
                      required
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full 800px:flex pl-9 block pb-3">
                  <div className=" w-[100%] 800px:w-[50%] mr-10">
                    <label className="block pb-2">Gender</label>
                    {/* <input
                      type="text"
                      className={`${styles.input}!w-[95%] rounded-lg`}
                      required
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    /> */}
                    <select
                      className="!w-full py-[5px] rounded-lg"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <option disabled>-- Select Gender --</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Not to say">Not to say</option>
                    </select>
                  </div>
                  <div className=" w-[100%] 800px:w-[50%]">
                    <label className="block pb-2">Country</label>
                    <input
                      type="text"
                      className={`${styles.input}!w-[95%] rounded-lg`}
                      required
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full 800px:flex pl-9 block pb-3">
                  <div className=" w-[100%] 800px:w-[50%] mr-10">
                    <label className="block pb-2">City</label>
                    <input
                      type="text"
                      className={`${styles.input}!w-[95%] rounded-lg`}
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                  <div className=" w-[100%] 800px:w-[50%]">
                    <label className="block pb-2">State</label>
                    <input
                      type="text"
                      className={`${styles.input}!w-[95%] rounded-lg`}
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full 800px:flex pl-9 block pb-3">
                  <div className=" w-[100%] 800px:w-[50%] mr-10">
                    <label className="block pb-2">Address-1</label>
                    <input
                      type="text"
                      className={`${styles.input}!w-[95%] rounded-lg`}
                      required
                      value={address1}
                      onChange={(e) => setAddress1(e.target.value)}
                    />
                  </div>
                  <div className=" w-[100%] 800px:w-[50%]">
                    <label className="block pb-2">Preferred Job Role</label>
                    <input
                      type="text"
                      className={`${styles.input}!w-[95%] rounded-lg`}
                      required
                      value={preferredJobRole}
                      onChange={(e) => setPreferredJobRole(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full 800px:flex pl-9 block pb-3">
                  <div className=" w-[100%] 800px:w-[50%] mr-10">
                    <label className="block pb-2">Zip Code</label>
                    <input
                      type="number"
                      className={`${styles.input}!w-[95%] rounded-lg`}
                      required
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                    />
                  </div>
                  <div className=" w-[100%] 800px:w-[50%]">
                    <label className="block pb-2">Address Type</label>
                    {/* <input
                      type="text"
                      className={`${styles.input}!w-[95%] rounded-lg`}
                      required
                      value={addressType}
                      onChange={(e) => setAddressType(e.target.value)}
                    /> */}
                    <select
                      className="!w-full py-[5px] rounded-lg"
                      value={addressType}
                      onChange={(e) => setAddressType(e.target.value)}
                    >
                      <option disabled> -- Select Address Type --</option>
                      <option value="Home">Home</option>
                      <option value="Office">Office</option>
                    </select>
                  </div>
                </div>
                <div className="text-center">
                  <input
                    type="submit"
                    className={`w-[200px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-lg mt-8 cursor-pointer`}
                    value="Update Primary Details"
                    required
                  />
                </div>
              </form>
            </div>
            <br />
            <br />

            {/* Skills */}
            <div className="w-full pr-8 bg-slate-300 mr-5 py-8 rounded-xl mx-8">
              <h1 className="mb-4 text-center mx-auto ml-7 text-black font-bold text-[30px]">
                Skills Details
              </h1>

              <form
                onSubmit={handleSubmit}
                className="800px:w-[1000px] mx-auto"
              >
                <div className="flex flex-wrap text-center ml-5 mb-2">
                  <h2 className="w-full text-center font-bold">
                    Technical Skills:
                  </h2>
                  {technicalSkills.map((role) => (
                    <span
                      key={role}
                      className="flex items-center bg-gray-200 rounded-md p-2 mr-2 mb-2"
                    >
                      {role}
                      <button
                        type="button"
                        onClick={() => openDeleteModal(role, true)}
                        className="ml-2 bg-transparent border-none cursor-pointer"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>

                <input
                  type="text"
                  value={inputValueTechnical}
                  onChange={(e) => handleInputChange(e, "technical")}
                  placeholder="Add technical skills..."
                  className="border ml-5 rounded-md p-2 w-full mx-auto mt-4"
                />

                {filteredTechnicalRoles.length > 0 && (
                  <ul className="list-none ml-5 p-0 mt-2 border mx-auto rounded-md max-h-36 overflow-y-auto absolute z-10 bg-white w-72 800px:w-[1000px]">
                    {filteredTechnicalRoles.map((role) => (
                      <li
                        key={role}
                        onClick={() => handleRoleSelect(role, "technical")}
                        className="p-2 cursor-pointer hover:bg-gray-200"
                      >
                        {role}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="flex flex-wrap text-center ml-5 mb-2 mt-6">
                  <h2 className="w-full text-center font-bold">
                    Non-Technical Skills:
                  </h2>
                  {nonTechnicalSkills.map((role) => (
                    <span
                      key={role}
                      className="flex items-center bg-gray-200 rounded-md p-2 mr-2 mb-2"
                    >
                      {role}
                      <button
                        type="button"
                        onClick={() => openDeleteModal(role, false)}
                        className="ml-2 bg-transparent border-none cursor-pointer"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>

                <input
                  type="text"
                  value={inputValueNonTechnical}
                  onChange={(e) => handleInputChange(e, "nonTechnical")}
                  placeholder="Add non-technical skills..."
                  className="border ml-5 rounded-md p-2 w-full mx-auto mt-4"
                />

                {filteredNonTechnicalRoles.length > 0 && (
                  <ul className="list-none ml-5 p-0 mt-2 border mx-auto rounded-md max-h-36 overflow-y-auto absolute z-10 bg-white w-72 800px:w-[1000px]">
                    {filteredNonTechnicalRoles.map((role) => (
                      <li
                        key={role}
                        onClick={() => handleRoleSelect(role, "nonTechnical")}
                        className="p-2 cursor-pointer hover:bg-gray-200"
                      >
                        {role}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="text-center mt-8">
                  <input
                    type="submit"
                    className={`w-[200px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-lg cursor-pointer`}
                    value="Update Skills"
                    required
                  />
                </div>
              </form>

              {isDeleteModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-lg font-semibold mb-4">
                      Are you sure you want to delete this skill?
                    </h2>
                    <div className="flex justify-between">
                      <button
                        onClick={closeDeleteModal}
                        className="bg-gray-300 px-4 py-2 rounded-md mr-2"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleDeleteSkill}
                        className="bg-red-500 text-white px-4 py-2 rounded-md"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
          </>
        )}

        {/* Roadmap page */}
        {active === 2 && (
          <div className="w-full pr-8 bg-slate-300 mr-5 py-8 rounded-xl mx-8">
            <h1 className="mb-4 text-center mx-auto ml-7 text-black font-bold text-[30px]">
              My Roadmap
            </h1>
            <div className="ml-7 text-black text-lg">
              {renderRoadmapOrSkills()}
            </div>
          </div>
        )}

        {/* applied jobs */}
        {active === 4 && (
          <div>
            <AppliedJobs />
          </div>
        )}
      </div>
    </>
  );
};

const AppliedJobs = () => {
  const applied = [
    {
      _id: "7463hvbfbhfbrtr28820221",
      totalApplied: [
        {
          title: "Full-Stack Developer",
        },
      ],
      appliedDate: "07-04-2005",
      applicationStatus: "Interview",
    },
  ];

  const columns = [
    {
      field: "id",
      headerName: "Application ID",
      minWidth: 150,
      flex: 0.7,
    },

    {
      field: "title",
      headerName: "Job Title",
      minWidth: 150,
      flex: 0.7,
    },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassNamme: (params) => {
        return params.getValue(params.id, "status") === "Applied"
          ? "text-blue-500"
          : params.getValue(params.id, "status") === "Interview"
          ? "text-yellow-500"
          : "text-green-500";
      },
    },

    {
      field: "date",
      headerName: "Applied Date",
      minWidth: 150,
      flex: 0.7,
    },

    {
      field: "action",
      headerName: "Action",
      minWidth: 150,
      flex: 0.7,
      renderCell: (params) => {
        return (
          <div>
            <button className="text-blue-500">View</button>
          </div>
        );
      },
    },
  ];

  const row = [];

  applied &&
    applied.forEach((item) => {
      row.push({
        id: item._id,
        title: item.totalApplied[0].title,
        status: item.applicationStatus,
        date: item.appliedDate,
      });
    });

  return (
    <div className="pl-9 pt-1">
      {/* <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      /> */}
    </div>
  );
};

export default ProfileContent;
