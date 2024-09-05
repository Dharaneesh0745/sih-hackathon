import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import {
  LandingPage,
  GetStartedPage,
  LoginPage,
  SignupPage,
  ActivationPage,
  HomePage,
  JobsPage,
  EventsPage,
  FAQPage,
  JobDetailsPage,
  ProfilePage,
  RankPage,
  TestPage,
  CoursesPage,
  UserDetailsPage,
  PreperationPage,
} from "./routes/Routes.js";
import {
  EmployerSignupPage,
  EmployerActivationPage,
  EmployerLoginPage,
  EmployerHomePage,
  EmployerDashboardPage,
  EmployerCreateJobPage,
  EmployerAllJobsPage,
} from "./routes/EmployerRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Store from "./redux/store.js";
import { loadEmployer, loadUser } from "./redux/actions/user.js";
// import { useSelector } from "react-redux";
import ProtectedRoute from "./routes/ProtectedRoutes.js";
import EmployerProtectedRoute from "./routes/EmployerProtectedRoute.js";
import { useSelector } from "react-redux";

import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import axios from "axios";
import styled from "styled-components";
import { server } from "./server.js";

const CustomChatBotWrapper = styled.div`
  .rsc-container {
    max-width: 600px !important;
  }
  .rsc-ts-bubble,
  .rsc-user-bubble {
    max-width: 500px !important;
    font-size: 16px !important;
  }
`;

// Function to format the response text dynamically
const formatResponse = (text) => {
  // Replace '**' for bold and '*' for italics, and '\n' for line breaks
  const formattedText = text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Bold
    .replace(/\*(.*?)\*/g, "<em>$1</em>") // Italics
    .replace(/##(.*?)##/g, "<h3>$1</h3>") // Headings
    .replace(/\n/g, "<br />"); // Line breaks
  return formattedText;
};

const FetchAPI = ({ steps }) => {
  const [response, setResponse] = useState("Fetching response...");
  const userQuery = steps["user-query"].value;

  useEffect(() => {
    axios
      .post(`${server}/bot/generate`, {
        prompt: userQuery,
      })
      .then((res) => {
        const formattedText = formatResponse(res.data.text);
        setResponse(formattedText);
      })
      .catch(() => {
        setResponse("Sorry, something went wrong.");
      });
  }, [userQuery]);

  return <div dangerouslySetInnerHTML={{ __html: response }} />;
};

// Function to get chatbot steps
const getSteps = (userName) => [
  {
    id: "1",
    message: `Hi ${userName || "there"}, nice to meet you! How can i help you?`,
    trigger: "user-query",
  },
  {
    id: "user-query",
    user: true,
    trigger: "fetch-response",
  },
  {
    id: "fetch-response",
    component: <FetchAPI />,
    asMessage: true,
    trigger: "ask-more",
  },
  {
    id: "ask-more",
    message: "Do you have another query?",
    trigger: "another-query",
  },
  {
    id: "another-query",
    options: [
      { value: "yes", label: "Yes", trigger: "user-query" },
      { value: "no", label: "No", trigger: "end" },
    ],
  },
  {
    id: "end",
    message: "Hope I was able to help. Have a nice day!",
    end: true,
  },
];

const theme = {
  background: "#f5f8fb",
  headerBgColor: "#EF6C00",
  headerFontColor: "#fff",
  headerFontSize: "15px",
  botBubbleColor: "#EF6C00",
  botFontColor: "#fff",
  userBubbleColor: "#fff",
  userFontColor: "#4a4a4a",
  fontFamily: "Roboto, sans-serif",
};

const App = () => {
  const { user, isEmployer, employer } = useSelector((state) => state.user);
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const [chatbotSteps, setChatbotSteps] = useState(getSteps());

  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(loadEmployer());

    if (isEmployer) {
      return <Navigate to={`/employer/${employer._id}`} replace />;
    }
  }, []);

  useEffect(() => {
    if (user) {
      setChatbotSteps(getSteps(user.firstName));
      setIsUserLoaded(true); // Set the flag once user data is loaded
    }
  }, [user]);

  return (
    <>
      {/* {loading || isLoading ? null : ( */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/getstarted" element={<GetStartedPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/activation/:activation_token"
            element={<ActivationPage />}
          />
          <Route
            path="/employer/activation/:activation_token"
            element={<EmployerActivationPage />}
          />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/jobs"
            element={
              <ProtectedRoute>
                <JobsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/events"
            element={
              <ProtectedRoute>
                <EventsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/test"
            element={
              <ProtectedRoute>
                <TestPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/u/:id"
            element={
              <ProtectedRoute>
                <UserDetailsPage />
              </ProtectedRoute>
            }
          />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/job/:name" element={<JobDetailsPage />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route path="/rank" element={<RankPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/preperation" element={<PreperationPage />} />

          {/* employer routes */}
          <Route path="/employer/signup" element={<EmployerSignupPage />} />
          <Route path="/employer/login" element={<EmployerLoginPage />} />
          <Route
            path="/employer/:id"
            element={
              <EmployerProtectedRoute>
                <EmployerHomePage />
              </EmployerProtectedRoute>
            }
          />
          <Route
            path="/employer/dashboard"
            element={
              <EmployerProtectedRoute>
                <EmployerDashboardPage />
              </EmployerProtectedRoute>
            }
          />
          <Route
            path="/employer/create-job"
            element={
              <EmployerProtectedRoute>
                <EmployerCreateJobPage />
              </EmployerProtectedRoute>
            }
          />
          <Route
            path="/employer/allJobs"
            element={
              <EmployerProtectedRoute>
                <EmployerAllJobsPage />
              </EmployerProtectedRoute>
            }
          />
        </Routes>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </BrowserRouter>
      {/* )} */}

      {isUserLoaded && (
        <CustomChatBotWrapper>
          {user && (
            <ThemeProvider theme={theme}>
              <ChatBot
                steps={chatbotSteps}
                floating={true}
                botDelay={3000}
                headerTitle={"LinkedIn"}
              />
            </ThemeProvider>
          )}
        </CustomChatBotWrapper>
      )}
    </>
  );
};

export default App;
