import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import JobCard from "../Sections/JobCard/JobCard";
import { server } from "../../server"; // Adjust the path if needed

const Jobs = () => {
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const { data: fetchedData } = await axios.get(
          `${server}/job/get-all-jobs`
        );
        let filteredData = fetchedData.jobs;

        if (categoryData) {
          filteredData = filteredData.filter(
            (job) => job.category === categoryData
          );
        }

        filteredData = filteredData.sort((a, b) => a.total_sell - b.total_sell);
        setData(filteredData);
      } catch (err) {
        setError(err.message || "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, [categoryData]);

  return (
    <div className={`${styles.section}`}>
      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
            {data.length > 0 ? (
              data.map((job, index) => <JobCard data={job} key={index} />)
            ) : (
              <h1 className="text-center w-full pb-[100px] text-[20px]">
                No Jobs Found
              </h1>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Jobs;
