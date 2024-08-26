import React from "react";
import { Link } from "react-router-dom";

const EmployerHome = () => {
  return (
    <div>
      <Link
        to={"/employer/dashboard"}
        className="px-3 py-5 rounded-md bg-blue-500 text-white"
      >
        Dashboard
      </Link>
    </div>
  );
};

export default EmployerHome;
