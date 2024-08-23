import React, { useEffect } from "react";
import GetStarted from "../components/GetStarted/GetStarted";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const GetStartedPage = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated === true) {
      navigate("/home");
    }
  }, []);

  return (
    <div>
      <GetStarted />
    </div>
  );
};

export default GetStartedPage;
