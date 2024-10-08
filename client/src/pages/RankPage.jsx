import React from "react";
import Header from "../components/Layouts/Header";
import Footer from "../components/Layouts/Footer";
import Rank from "../components/Rank/Rank";

const RankPage = () => {
  return (
    <div>
      <Header activeHeading={8} />
      <Rank />
      <Footer />
    </div>
  );
};

export default RankPage;
