import React from "react";
import Header from "../components/Layouts/Header";
import Footer from "../components/Layouts/Footer";
import Preperation from "../components/Preperation/Preperation";

const PreperationPage = () => {
  return (
    <>
      <Header activeHeading={3} />
      <Preperation />
      <Footer />
    </>
  );
};

export default PreperationPage;
