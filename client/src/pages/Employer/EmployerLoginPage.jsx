import React, { useEffect } from "react";
import EmployerLogin from "../../components/Employer/Login/EmployerLogin";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const EmployerLoginPage = () => {
  const { isEmployer, isLoading } = useSelector((state) => state.employer);
  const navigate = useNavigate();

  useEffect(() => {
    if (isEmployer === true) {
      navigate(`/employer/home`);
    }
  }, [isLoading, isEmployer]);
  return (
    <div>
      <EmployerLogin />
    </div>
  );
};

export default EmployerLoginPage;
