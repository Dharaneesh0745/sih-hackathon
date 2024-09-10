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
import { categoriesData } from "../../data/data";
import { DataGrid } from "@mui/x-data-grid";
import { useLocation } from "react-router-dom";

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

  const location = useLocation();
  const [activee, setActivee] = useState(location.state?.activeTab || 0);

  const [userQuery, setUserQuery] = useState("");

  const [allAppliedJobs, setAllAppliedJobs] = useState([]);

  const [education, setEducation] = useState(user?.education || []);

  const [achievements, setAchievements] = useState(user?.achievements || []);

  const handleAddAchievement = () => {
    setAchievements([
      ...achievements,
      {
        certificateUrl: "",
        certificateName: "",
        issueDate: "",
        skillsAcquired: "",
        duration: "",
      },
    ]);
  };

  const handleAchievementChange = (index, field, value) => {
    const updatedAchievements = achievements.map((ach, i) =>
      i === index ? { ...ach, [field]: value } : ach
    );
    setAchievements(updatedAchievements);
  };

  const handleRemoveAchievement = (index) => {
    const updatedAchievements = achievements.filter((_, i) => i !== index);
    setAchievements(updatedAchievements);
  };

  const handleFileUpload = (index) => {
    window.cloudinary.openUploadWidget(
      { cloudName: "dzutfi16w", uploadPreset: "bjydfkpb" },
      (error, result) => {
        if (result && result.event === "success") {
          handleAchievementChange(
            index,
            "certificateUrl",
            result.info.secure_url
          );
        }
      }
    );
  };

  const handleAchievementsSubmit = async () => {
    try {
      await axios.post(`${server}/user/update-achievements/${user._id}`, {
        achievements,
      });
      toast.success("Achievements updated successfully");
    } catch (error) {
      console.error("Error updating achievements:", error);
    }
  };

  const [projects, setProjects] = useState(user?.projects || []);

  const handleAddProject = () => {
    setProjects([
      ...projects,
      {
        name: "",
        theme: "",
        domain: "",
        startDate: "",
        endDate: "",
        currentlyWorking: false,
        skillsAcquired: "",
        description: "",
        images: "",
      },
    ]);
  };

  const handleProjectChange = (index, field, value) => {
    const updatedProjects = projects.map((proj, i) =>
      i === index ? { ...proj, [field]: value } : proj
    );
    setProjects(updatedProjects);
  };

  const handleToggleCurrentlyWorking = (index) => {
    const updatedProjects = projects.map((proj, i) =>
      i === index ? { ...proj, currentlyWorking: !proj.currentlyWorking } : proj
    );
    setProjects(updatedProjects);
  };

  const handleRemoveProject = (index) => {
    const updatedProjects = projects.filter((_, i) => i !== index);
    setProjects(updatedProjects);
  };

  const handleProjectFileUpload = (index) => {
    window.cloudinary.openUploadWidget(
      { cloudName: "dzutfi16w", uploadPreset: "bjydfkpb" },
      (error, result) => {
        if (result && result.event === "success") {
          const uploadedImageUrl = result.info.secure_url;
          const updatedProjects = projects.map((proj, i) =>
            i === index ? { ...proj, image: uploadedImageUrl } : proj
          );
          setProjects(updatedProjects);
        } else if (error) {
          console.error("Upload error:", error);
        }
      }
    );
  };

  const handleProjectSubmit = async () => {
    try {
      await axios.post(`${server}/user/update-projects/${user._id}`, {
        projects,
      });
      toast.success("Projects updated successfully");
      console.log(projects);
    } catch (error) {
      console.error("Error updating projects:", error);
    }
  };

  // const [resumeData, setResumeData] = useState([]);

  // // Format the response data
  // const formatResponseResume = (data) => {
  //   if (typeof data === "string") {
  //     return data
  //       .split("\n")
  //       .map((line, index) => ({
  //         id: index,
  //         text: line.trim(),
  //       }))
  //       .filter((step) => step.text !== "");
  //   } else if (Array.isArray(data)) {
  //     return data.map((item, index) => ({
  //       id: index,
  //       text: item,
  //     }));
  //   } else if (typeof data === "object") {
  //     return Object.entries(data).map(([key, value], index) => ({
  //       id: index,
  //       text: `${key}: ${value}`,
  //     }));
  //   } else {
  //     return []; // Return an empty array if the data is not in a recognized format
  //   }
  // };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.post(`${bot_API_endpoint}/bot/chatBot`, {
  //         prompt: `Generate resume data ${JSON.stringify(user)}`,
  //       });
  //       const formattedData = formatResponseResume(response.data);
  //       setResumeData(formattedData);
  //     } catch (error) {
  //       console.error("Error fetching resume data:", error);
  //       setResumeData([]); // Ensure resumeData is always an array
  //     }
  //   };

  //   if (active === 3) {
  //     fetchData();
  //   }
  // }, [active, user]); // Ensure user is included in the dependency array

  // if (active !== 3) return null;

  const handleAddEducation = () => {
    setEducation([
      ...education,
      { degree: "", universityName: "", fieldOfStudy: "", graduationYear: "" },
    ]);
  };

  const handleEducationChange = (index, field, value) => {
    const updatedEducation = education.map((edu, i) =>
      i === index ? { ...edu, [field]: value } : edu
    );
    setEducation(updatedEducation);
  };

  const handleRemoveEducation = (index) => {
    const updatedEducation = education.filter((_, i) => i !== index);
    setEducation(updatedEducation);
  };

  const handleEducationSubmit = async () => {
    try {
      await axios.post(`${server}/user/update-education/${user._id}`, {
        education,
      });
      toast.success("Education details updated successfully");
    } catch (error) {
      console.error("Error updating education details:", error);
    }
  };

  const [experience, setExperience] = useState(user?.experience || []);

  const handleAddExperience = () => {
    setExperience([
      ...experience,
      {
        companyName: "",
        role: "",
        duration: "",
        learnedSkills: "",
        description: "",
      },
    ]);
  };

  const handleExperienceChange = (index, field, value) => {
    const updatedExperience = experience.map((exp, i) =>
      i === index ? { ...exp, [field]: value } : exp
    );
    setExperience(updatedExperience);
  };

  const handleRemoveExperience = (index) => {
    const updatedExperience = experience.filter((_, i) => i !== index);
    setExperience(updatedExperience);
  };

  const handleExperienceSubmit = async () => {
    try {
      await axios.post(`${server}/user/update-experience/${user._id}`, {
        experience,
      });
      toast.success("Experience details updated successfully");
    } catch (error) {
      console.error("Error updating experience details:", error);
    }
  };

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
    if (user.roadMapData === "None") {
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
                  src={`${user.avatar}`}
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
                    <select
                      className={`${styles.input} !w-[95%] rounded-lg`}
                      required
                      value={preferredJobRole}
                      onChange={(e) => setPreferredJobRole(e.target.value)}
                    >
                      <option value="">-- Select a job role --</option>
                      {categoriesData.map((category) => (
                        <option key={category.id} value={category.title}>
                          {category.title}
                        </option>
                      ))}
                    </select>
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

            {/* education */}
            <div className="w-full pr-8 bg-slate-300 mr-5 py-8 rounded-xl mx-8">
              <h1 className="mb-4 text-center mx-auto ml-7 text-black font-bold text-[30px]">
                Education
              </h1>
              <div className="ml-7 text-black text-lg">
                {education.map((edu, index) => (
                  <div key={index} className="mb-4">
                    <input
                      type="text"
                      placeholder="Degree"
                      value={edu.degree}
                      onChange={(e) =>
                        handleEducationChange(index, "degree", e.target.value)
                      }
                      className="block w-full mb-2 p-2 rounded-md"
                    />
                    <input
                      type="text"
                      placeholder="University Name"
                      value={edu.universityName}
                      onChange={(e) =>
                        handleEducationChange(
                          index,
                          "universityName",
                          e.target.value
                        )
                      }
                      className="block w-full mb-2 p-2 rounded-md"
                    />
                    <input
                      type="text"
                      placeholder="Field of Study"
                      value={edu.fieldOfStudy}
                      onChange={(e) =>
                        handleEducationChange(
                          index,
                          "fieldOfStudy",
                          e.target.value
                        )
                      }
                      className="block w-full mb-2 p-2 rounded-md"
                    />
                    <input
                      type="number"
                      placeholder="Graduation Year"
                      value={edu.graduationYear}
                      onChange={(e) =>
                        handleEducationChange(
                          index,
                          "graduationYear",
                          e.target.value
                        )
                      }
                      className="block w-full mb-2 p-2 rounded-md"
                    />
                    <button
                      onClick={() => handleRemoveEducation(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  onClick={handleAddEducation}
                  className="bg-blue-500 text-white p-2 rounded-md"
                >
                  Add Education
                </button>
                <button
                  onClick={handleEducationSubmit}
                  className="bg-green-500 text-white p-2 rounded-md mt-4"
                >
                  Save Changes
                </button>
              </div>
            </div>

            <br />
            <br />
            {/* experience */}
            <div className="w-full pr-8 bg-slate-300 mr-5 py-8 rounded-xl mx-8">
              <h1 className="mb-4 text-center mx-auto ml-7 text-black font-bold text-[30px]">
                Experience
              </h1>
              <div className="ml-7 text-black text-lg">
                {experience.map((exp, index) => (
                  <div key={index} className="mb-4">
                    <input
                      type="text"
                      placeholder="Company Name"
                      value={exp.companyName}
                      onChange={(e) =>
                        handleExperienceChange(
                          index,
                          "companyName",
                          e.target.value
                        )
                      }
                      className="block w-full mb-2 p-2 rounded-md"
                    />
                    <input
                      type="text"
                      placeholder="Role"
                      value={exp.role}
                      onChange={(e) =>
                        handleExperienceChange(index, "role", e.target.value)
                      }
                      className="block w-full mb-2 p-2 rounded-md"
                    />
                    <input
                      type="text"
                      placeholder="Duration"
                      value={exp.duration}
                      onChange={(e) =>
                        handleExperienceChange(
                          index,
                          "duration",
                          e.target.value
                        )
                      }
                      className="block w-full mb-2 p-2 rounded-md"
                    />
                    <input
                      type="text"
                      placeholder="Learned Skills"
                      value={exp.learnedSkills}
                      onChange={(e) =>
                        handleExperienceChange(
                          index,
                          "learnedSkills",
                          e.target.value
                        )
                      }
                      className="block w-full mb-2 p-2 rounded-md"
                    />
                    <textarea
                      placeholder="Description of Work"
                      value={exp.description}
                      onChange={(e) =>
                        handleExperienceChange(
                          index,
                          "description",
                          e.target.value
                        )
                      }
                      className="block w-full mb-2 p-2 rounded-md"
                    />
                    <button
                      onClick={() => handleRemoveExperience(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  onClick={handleAddExperience}
                  className="bg-blue-500 text-white p-2 rounded-md"
                >
                  Add Experience
                </button>
                <button
                  onClick={handleExperienceSubmit}
                  className="bg-green-500 text-white p-2 rounded-md mt-4"
                >
                  Save Changes
                </button>
              </div>
            </div>

            <br />
            <br />
            {/* achievements */}
            <div className="w-full pr-8 bg-slate-300 mr-5 py-8 rounded-xl mx-8">
              <h1 className="mb-4 text-center mx-auto ml-7 text-black font-bold text-[30px]">
                Achievements
              </h1>
              <div className="ml-7 text-black text-lg">
                {achievements.map((ach, index) => (
                  <div key={index} className="mb-4">
                    <button
                      onClick={() => handleFileUpload(index)}
                      className="bg-blue-500 text-white p-2 rounded-md mb-2"
                    >
                      Upload Certificate
                    </button>
                    {ach.certificateUrl && (
                      <img
                        src={ach.certificateUrl}
                        alt="Certificate"
                        className="block w-full mb-2 rounded-md"
                      />
                    )}
                    <input
                      type="text"
                      placeholder="Certificate Name"
                      value={ach.certificateName}
                      onChange={(e) =>
                        handleAchievementChange(
                          index,
                          "certificateName",
                          e.target.value
                        )
                      }
                      className="block w-full mb-2 p-2 rounded-md"
                    />
                    <input
                      type="date"
                      placeholder="Issue Date"
                      value={ach.issueDate}
                      onChange={(e) =>
                        handleAchievementChange(
                          index,
                          "issueDate",
                          e.target.value
                        )
                      }
                      className="block w-full mb-2 p-2 rounded-md"
                    />
                    <input
                      type="text"
                      placeholder="Skills Acquired"
                      value={ach.skillsAcquired}
                      onChange={(e) =>
                        handleAchievementChange(
                          index,
                          "skillsAcquired",
                          e.target.value
                        )
                      }
                      className="block w-full mb-2 p-2 rounded-md"
                    />
                    <input
                      type="text"
                      placeholder="Duration"
                      value={ach.duration}
                      onChange={(e) =>
                        handleAchievementChange(
                          index,
                          "duration",
                          e.target.value
                        )
                      }
                      className="block w-full mb-2 p-2 rounded-md"
                    />
                    <button
                      onClick={() => handleRemoveAchievement(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  onClick={handleAddAchievement}
                  className="bg-blue-500 text-white p-2 rounded-md"
                >
                  Add Achievement
                </button>
                <button
                  onClick={handleAchievementsSubmit}
                  className="bg-green-500 text-white p-2 rounded-md mt-4"
                >
                  Save Changes
                </button>
              </div>
            </div>

            <br />
            <br />
            {/* projects */}
            <div className="w-full pr-8 bg-slate-300 mr-5 py-8 rounded-xl mx-8">
              <h1 className="mb-4 text-center mx-auto ml-7 text-black font-bold text-[30px]">
                Projects
              </h1>
              <div className="ml-7 text-black text-lg">
                {projects.map((proj, index) => (
                  <div key={index} className="mb-4">
                    <input
                      type="text"
                      placeholder="Project Name"
                      value={proj.name}
                      onChange={(e) =>
                        handleProjectChange(index, "name", e.target.value)
                      }
                      className="block w-full mb-2 p-2 rounded-md"
                    />
                    <input
                      type="text"
                      placeholder="Theme"
                      value={proj.theme}
                      onChange={(e) =>
                        handleProjectChange(index, "theme", e.target.value)
                      }
                      className="block w-full mb-2 p-2 rounded-md"
                    />
                    <input
                      type="text"
                      placeholder="Domain"
                      value={proj.domain}
                      onChange={(e) =>
                        handleProjectChange(index, "domain", e.target.value)
                      }
                      className="block w-full mb-2 p-2 rounded-md"
                    />
                    <input
                      type="date"
                      placeholder="Start Date"
                      value={proj.startDate}
                      onChange={(e) =>
                        handleProjectChange(index, "startDate", e.target.value)
                      }
                      className="block w-full mb-2 p-2 rounded-md"
                    />
                    <input
                      type="date"
                      placeholder="End Date"
                      value={proj.endDate}
                      onChange={(e) =>
                        handleProjectChange(index, "endDate", e.target.value)
                      }
                      className="block w-full mb-2 p-2 rounded-md"
                      disabled={proj.currentlyWorking}
                    />
                    <label>
                      <input
                        type="checkbox"
                        checked={proj.currentlyWorking}
                        onChange={() => handleToggleCurrentlyWorking(index)}
                      />
                      Currently Working On It
                    </label>
                    <input
                      type="text"
                      placeholder="Skills Acquired"
                      value={proj.skillsAcquired}
                      onChange={(e) =>
                        handleProjectChange(
                          index,
                          "skillsAcquired",
                          e.target.value
                        )
                      }
                      className="block w-full mb-2 p-2 rounded-md"
                    />
                    <textarea
                      placeholder="Project Description"
                      value={proj.description}
                      onChange={(e) =>
                        handleProjectChange(
                          index,
                          "description",
                          e.target.value
                        )
                      }
                      className="block w-full mb-2 p-2 rounded-md"
                    />
                    <button
                      onClick={() => handleProjectFileUpload(index)}
                      className="bg-blue-500 text-white p-2 rounded-md mb-2"
                    >
                      Upload Project Images
                    </button>
                    {proj.image && (
                      <img
                        src={proj.image}
                        alt="Uploaded"
                        style={{ maxWidth: "100%", height: "auto" }}
                      />
                    )}
                    <button
                      onClick={() => handleRemoveProject(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  onClick={handleAddProject}
                  className="bg-blue-500 text-white p-2 rounded-md"
                >
                  Add Project
                </button>
                <button
                  onClick={handleProjectSubmit}
                  className="bg-green-500 text-white p-2 rounded-md mt-4"
                >
                  Save Changes
                </button>
              </div>
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

        {/* Resume Generator */}
        {/* {active === 3 && (
          <div className="w-full p-8 bg-gray-100 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-center mb-6">My Resume</h1>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <section className="mb-6">
                <h2 className="text-2xl font-semibold">Personal Information</h2>
                <p className="text-lg mt-2">
                  {
                    resumeData.find((item) =>
                      item.text.includes("Full Stack Developer")
                    )?.text
                  }
                </p>
                <p className="text-lg mt-2">
                  {
                    resumeData.find((item) =>
                      item.text.includes("dharaneesh5577@gmail.com")
                    )?.text
                  }
                </p>
                <p className="text-lg mt-2">
                  {
                    resumeData.find((item) =>
                      item.text.includes("+91 59883009")
                    )?.text
                  }
                </p>
                <p className="text-lg mt-2">
                  {
                    resumeData.find((item) =>
                      item.text.includes("Coimbatore, India")
                    )?.text
                  }
                </p>
              </section>

              <section className="mb-6">
                <h2 className="text-2xl font-semibold">Summary</h2>
                <p className="text-lg mt-2">
                  {
                    resumeData.find((item) =>
                      item.text.includes("Highly motivated")
                    )?.text
                  }
                </p>
              </section>

              <section className="mb-6">
                <h2 className="text-2xl font-semibold">Skills</h2>
                <div className="mt-2">
                  <h3 className="text-xl font-semibold">Technical:</h3>
                  <ul className="list-disc ml-6">
                    {resumeData
                      .filter(
                        (item) =>
                          item.text.includes("Frontend") ||
                          item.text.includes("Backend") ||
                          item.text.includes("Database") ||
                          item.text.includes("Version Control") ||
                          item.text.includes("Cloud") ||
                          item.text.includes("Other")
                      )
                      .map((item) => (
                        <li key={item.id} className="text-lg">
                          {item.text}
                        </li>
                      ))}
                  </ul>
                  <h3 className="text-xl font-semibold mt-4">Non-Technical:</h3>
                  <ul className="list-disc ml-6">
                    {resumeData
                      .filter(
                        (item) =>
                          item.text.includes("Project Management") ||
                          item.text.includes("Team Collaboration") ||
                          item.text.includes("Problem Solving")
                      )
                      .map((item) => (
                        <li key={item.id} className="text-lg">
                          {item.text}
                        </li>
                      ))}
                  </ul>
                </div>
              </section>

              <section className="mb-6">
                <h2 className="text-2xl font-semibold">Experience</h2>
                <div className="mt-2">
                  {resumeData
                    .filter(
                      (item) =>
                        item.text.includes("Full Stack Developer") ||
                        item.text.includes("CharacterXYZ")
                    )
                    .map((item) => (
                      <p key={item.id} className="text-lg mb-2">
                        {item.text}
                      </p>
                    ))}
                </div>
              </section>

              <section className="mb-6">
                <h2 className="text-2xl font-semibold">Education</h2>
                <div className="mt-2">
                  {resumeData
                    .filter(
                      (item) =>
                        item.text.includes("BTech") ||
                        item.text.includes("SIET")
                    )
                    .map((item) => (
                      <p key={item.id} className="text-lg mb-2">
                        {item.text}
                      </p>
                    ))}
                </div>
              </section>

              <section className="mb-6">
                <h2 className="text-2xl font-semibold">Projects</h2>
                <div className="mt-2">
                  {resumeData
                    .filter(
                      (item) =>
                        item.text.includes("Reward and Referral System") ||
                        item.text.includes("Personal Portfolio Website")
                    )
                    .map((item) => (
                      <p key={item.id} className="text-lg mb-2">
                        {item.text}
                      </p>
                    ))}
                </div>
              </section>

              <section className="mb-6">
                <h2 className="text-2xl font-semibold">Roadmap</h2>
                <div className="mt-2">
                  {resumeData
                    .filter(
                      (item) =>
                        item.text.includes("Frontend") ||
                        item.text.includes("Backend") ||
                        item.text.includes("Full Stack")
                    )
                    .map((item) => (
                      <p key={item.id} className="text-lg mb-2">
                        {item.text}
                      </p>
                    ))}
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold">Links</h2>
                <p className="text-lg mt-2">
                  GitHub:{" "}
                  <a
                    href="[Your GitHub Profile Link]"
                    className="text-blue-600"
                  >
                    {
                      resumeData.find((item) => item.text.includes("GitHub"))
                        ?.text
                    }
                  </a>
                </p>
                <p className="text-lg mt-2">
                  LinkedIn:{" "}
                  <a
                    href="[Your LinkedIn Profile Link]"
                    className="text-blue-600"
                  >
                    {
                      resumeData.find((item) => item.text.includes("LinkedIn"))
                        ?.text
                    }
                  </a>
                </p>
              </section>
            </div>
          </div>
        )} */}

        {/* applied jobs */}
        {(active === activee || active === 5) && (
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
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

export default ProfileContent;
