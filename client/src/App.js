import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
} from "./routes/Routes.js";
import {
  EmployerSignupPage,
  EmployerActivationPage,
  EmployerLoginPage,
  EmployerHomePage,
  EmployerDashboardPage,
} from "./routes/EmployerRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Store from "./redux/store.js";
import { loadEmployer, loadUser } from "./redux/actions/user.js";
// import { useSelector } from "react-redux";
import ProtectedRoute from "./routes/ProtectedRoutes.js";
import EmployerProtectedRoute from "./routes/EmployerProtectedRoute.js";

const App = () => {
  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(loadEmployer());

    // if (isEmployer) {
    //   return <Navigate to={"/dhoni"} replace />;
    // }
  }, []);

  // console.log(isEmployer, employer);

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

          {/* employer routes */}
          <Route path="/employer/signup" element={<EmployerSignupPage />} />
          <Route path="/employer/login" element={<EmployerLoginPage />} />
          <Route
            path="/employer/home"
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
    </>
  );
};

export default App;
