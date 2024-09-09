import React, { useEffect, useState } from "react";
import Header from "../components/Layouts/Header";
import Footer from "../components/Layouts/Footer";
import JobDetail from "../components/JobDetail/JobDetail";
import { useParams } from "react-router-dom";
import SuggestedJobs from "../components/SuggestedJobs/SuggestedJobs";
import axios from "axios";
import { server } from "../server"; // Adjust the path if needed

const JobDetailsPage = () => {
  const { id } = useParams(); // Ensure you are retrieving the ID from the URL params
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      // Check if the ID is defined
      const fetchJobData = async () => {
        setIsLoading(true);
        setError(null);

        try {
          const { data: fetchedData } = await axios.get(
            `${server}/job/get-job/${id}`
          );
          setData(fetchedData.job); // Adjust based on actual response structure
        } catch (err) {
          setError(err.message || "An error occurred");
        } finally {
          setIsLoading(false);
        }
      };

      fetchJobData();
    }
  }, [id]);

  return (
    <div>
      <Header />
      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <>
          <JobDetail data={data} />
          {data && <SuggestedJobs data={data} />}
        </>
      )}
      <Footer />
    </div>
  );
};

export default JobDetailsPage;
