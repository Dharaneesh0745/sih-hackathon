import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div>
      <div>
        <Link to={"/getstarted"} className="bg-blue-500 px-2 py-3">
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Landing;
