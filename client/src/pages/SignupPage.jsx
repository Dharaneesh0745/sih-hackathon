import React, { useEffect } from "react";
import Signup from "../components/Signup/Signup";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated === true) {
      navigate("/home");
    }
  }, []);
  return (
    <div>
      <Signup />
    </div>
  );
};

export default SignupPage;
