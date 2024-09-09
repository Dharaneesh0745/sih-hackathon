import React from "react";
import Hero from "../Sections/Hero/Hero";
import RecommendedJobs from "../Sections/RecommendedJobs/RecommendedJobs";
import Events from "../Sections/Events/Events";
import FeaturedJobs from "../Sections/FeaturedJobs/FeaturedJobs";
import Footer from "../Layouts/Footer";

const Home = () => {
  return (
    <div>
      <Hero />
      <RecommendedJobs />
      <Events />
      {/* <FeaturedJobs /> */}
      <Footer />
    </div>
  );
};

export default Home;
