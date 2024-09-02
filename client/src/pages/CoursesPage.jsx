import React from "react";
import Header from "../components/Layouts/Header";
import Footer from "../components/Layouts/Footer";
import Courses from "../components/Courses/Courses";

const CoursesPage = () => {
  return (
    <>
      <Header activeHeading={6} />
      <Courses />
      <Footer />
    </>
  );
};

export default CoursesPage;
