import React from "react";
import Header from "../components/Layouts/Header";
import FAQ from "../components/FAQ/FAQ";

const FAQPage = () => {
  return (
    <div>
      <Header activeItem={0} />
      <FAQ />
    </div>
  );
};

export default FAQPage;
