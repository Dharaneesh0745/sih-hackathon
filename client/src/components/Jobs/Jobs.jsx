import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import { useSearchParams } from "react-router-dom";
import { jobData } from "../../data/data";
import JobCard from "../Sections/JobCard/JobCard";

const Jobs = () => {
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const [data, setData] = useState();

  useEffect(() => {
    if (categoryData === null) {
      const d = jobData && jobData.sort((a, b) => a.total_sell - b.total_sell);
      setData(d);
    } else {
      const d = jobData && jobData.filter((i) => i.category === categoryData);
      setData(d);
    }
    // window.scrollTo(0,0)
  });

  return (
    <>
      <div className={`${styles.section}`}>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
          {data && data.map((i, index) => <JobCard data={i} key={index} />)}
        </div>
        {data && data.length === 0 ? (
          <h1 className="text-center w-full pb-[100px] text-[20px]">
            No Jobs Found
          </h1>
        ) : null}
      </div>
    </>
  );
};

export default Jobs;
