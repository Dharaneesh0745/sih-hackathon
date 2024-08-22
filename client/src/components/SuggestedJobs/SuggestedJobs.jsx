import React, { useEffect, useState } from "react";
import { jobData } from "../../data/data";
import styles from "../../styles/styles";
import JobCard from "../Sections/JobCard/JobCard";

const SuggestedJobs = ({ data }) => {
  const [jobs, setJobs] = useState(null);

  useEffect(() => {
    const d = jobData && jobData.filter((i) => i.category === data.category);
    setJobs(d);
  }, []);

  return (
    <>
      <div>
        {data ? (
          <div className={`p-4 ${styles.section}`}>
            <h2
              className={`${styles.heading} text-[25px] font-[500] border-b mb-5`}
            >
              Related Jobs
            </h2>
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
              {jobs && jobs.map((i, index) => <JobCard data={i} key={index} />)}
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default SuggestedJobs;
