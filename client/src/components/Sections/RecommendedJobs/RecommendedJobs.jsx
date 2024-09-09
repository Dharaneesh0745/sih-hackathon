import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../../styles/styles";
import JobCard from "../JobCard/JobCard";
import { useSelector } from "react-redux";
import Loader from "../../Layouts/Loader";
import SmallLoader from "../../Layouts/SmallLoader";

const RecommendedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user } = useSelector((state) => state.user);
  const id = user?._id;

  useEffect(() => {
    const fetchRecommendedJobs = async () => {
      let timeout;

      try {
        setIsLoading(true);
        setError(null);

        // Set a timeout for the request
        const source = axios.CancelToken.source();
        timeout = setTimeout(() => {
          source.cancel("Request timed out");
        }, 10000); // Timeout after 10 seconds

        const response = await axios.get(
          `https://jobrecommendations.onrender.com/recommender/${id}/`,
          {
            cancelToken: source.token,
          }
        );

        console.log("API Response:", response);

        clearTimeout(timeout);

        const recommendedJobs = response.data.recommended_jobs || [];
        console.log("Recommended Jobs:", recommendedJobs);

        const sortedJobs = [...recommendedJobs].sort(
          (a, b) => b.similarity_score - a.similarity_score
        );
        setJobs(sortedJobs);
      } catch (err) {
        clearTimeout(timeout); // Ensure timeout is cleared
        if (axios.isCancel(err)) {
          setError("The request was canceled due to timeout");
        } else {
          console.error("Error fetching recommended jobs:", err.message); // Log error message
          setError(
            err.response
              ? err.response.data.message
              : "An unexpected network error occurred"
          );
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchRecommendedJobs();
    }
  }, [id]);

  return (
    <div className="mt-10">
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Recommended Jobs</h1>
        </div>
        {isLoading ? (
          <div className="flex justify-between mx-auto text-center">
            <SmallLoader />
          </div>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          ""
        )}
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
          {/* {isLoading ? (
            <div className="flex justify-between mx-auto text-center">
              <Loader />
            </div> */}
          {error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : jobs.length > 0 ? (
            jobs.map((job) => (
              <JobCard
                data={job}
                key={job.job_id} // Use a unique identifier for the key
              />
            ))
          ) : (
            <h1 className="text-center w-full pb-[100px] text-[20px]">
              No Jobs Found
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecommendedJobs;
