import React from "react";
import styles from "../../../styles/styles";
import JobCard from "../JobCard/JobCard";
import { jobData } from "../../../data/data";

const FeaturedJobs = () => {
  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Featured Jobs</h1>
        </div>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
          {jobData &&
            jobData.map((i, index) => <JobCard data={i} key={index} />)}
        </div>
      </div>
    </div>
  );
};

export default FeaturedJobs;
