import React from "react";
import Header from "../components/Layouts/Header";
import Footer from "../components/Layouts/Footer";
import Community from "../components/Community/Community";

const CommunityPage = () => {
  return (
    <>
      <Header activeHeading={5} />
      <div>
        <Community />
      </div>
      <Footer />
    </>
  );
};

export default CommunityPage;
