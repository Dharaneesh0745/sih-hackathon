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

const FetchAPI = ({ steps }) => {
  const [response, setResponse] = useState("Fetching response...");

  const userQuery = steps["user-query"].value;

  useEffect(() => {
    axios
      .post("https://sih-hackathon.onrender.com/api/v1/bot/generate", {
        prompt: userQuery,
      })
      .then((res) => {
        setResponse(res.data.text);
      })
      .catch((error) => {
        setResponse("Sorry, something went wrong with the API.");
      });
  }, [userQuery]);

  return <div>{response}</div>;
};

const steps = [
  {
    id: "1",
    message: "What is your name?",
    trigger: "2",
  },
  {
    id: "2",
    user: true,
    trigger: "3",
  },
  {
    id: "3",
    message:
      "Hi {previousValue}, nice to meet you! Would you like to ask me something?",
    trigger: "4",
  },
  {
    id: "4",
    message: "Please enter your query.",
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
    trigger: "end",
  },
  {
    id: "end",
    message: "Hope I was able to help. Have a nice day!",
    end: true,
  },
];

const App = () => {
  const { isEmployer, employer } = useSelector((state) => state.user);

  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(loadEmployer());

    if (isEmployer) {
      return <Navigate to={`/employer/${employer._id}`} replace />;
    }
  }, []);

  // console.log(isEmployer, employer);

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
      <ThemeProvider theme={theme}>
        <ChatBot
          steps={steps}
          floating={true}
          botDelat={3000}
          headerTitle={"LinkedIn"}
        />
      </ThemeProvider>
    </>
  );
};

export default App;
