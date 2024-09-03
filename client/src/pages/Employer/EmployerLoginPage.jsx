import React, { useEffect } from "react";
import EmployerLogin from "../../components/Employer/Login/EmployerLogin";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const EmployerLoginPage = () => {
  const { isEmployer, isLoading, employer } = useSelector(
    (state) => state.employer
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (isEmployer === true) {
      navigate(`/employer/${employer._id}`);
    }
  }, [isLoading, isEmployer, employer]);
  return (
    <div>
      <EmployerLogin />
    </div>
  );
};

export default EmployerLoginPage;
