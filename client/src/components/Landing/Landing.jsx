import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div>
      <div>
        <Link to={"/home"}>Get Started</Link>
      </div>
    </div>
  );
};

export default Landing;
