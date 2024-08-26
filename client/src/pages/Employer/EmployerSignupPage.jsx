import React, { useEffect } from "react";
import EmployerSignup from "../../components/Employer/Signup/EmployerSignup";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const EmployerSignupPage = () => {
  const { isEmployer } = useSelector((state) => state.employer);
  const navigate = useNavigate();

  useEffect(() => {
    if (isEmployer === true) {
      navigate(`/employer/home`);
    }
  }, []);
  return (
    <div>
      <EmployerSignup />
    </div>
  );
};

export default EmployerSignupPage;
