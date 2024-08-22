import React from "react";
import Jobs from "../components/Jobs/Jobs";
import Header from "../components/Layouts/Header";

const JobsPage = () => {
  return (
    <div>
      <Header activeHeading={2} />
      <br />
      <br />
      <Jobs />
    </div>
  );
};

export default JobsPage;
