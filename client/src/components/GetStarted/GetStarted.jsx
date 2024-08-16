import React from "react";
import { Link } from "react-router-dom";

const GetStarted = () => {
  return (
    <div className="">
      <Link to={"/login"} className="p-3 text-white bg-blue-500 mr-2">
        Job Seeker
      </Link>
      <Link className="p-3 text-white bg-blue-500 mr-2">Employeer</Link>
      <Link className="p-3 text-white bg-blue-500">Admin</Link>
    </div>
  );
};

export default GetStarted;
