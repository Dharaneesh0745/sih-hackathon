import React from "react";
import Header from "../components/Layouts/Header";
import Test from "../components/Test/Test";
import Footer from "../components/Layouts/Footer";

const TestPage = () => {
  return (
    <div>
      <Header activeHeading={7} />
      <Test />
      <Footer />
    </div>
  );
};

export default TestPage;
