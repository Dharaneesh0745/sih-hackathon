import React from "react";
import Header from "../components/Layouts/Header";
import Home from "../components/Home/Home";

const HomePage = () => {
  return (
    <div>
      <Header activeHeading={1} />
      <Home />
    </div>
  );
};

export default HomePage;
