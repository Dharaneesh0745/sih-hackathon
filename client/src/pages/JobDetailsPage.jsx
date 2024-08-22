import React, { useEffect, useState } from "react";
import Header from "../components/Layouts/Header";
import Footer from "../components/Layouts/Footer";
import JobDetail from "../components/JobDetail/JobDetail";
import { useParams } from "react-router-dom";
import { jobData } from "../data/data";
import SuggestedJobs from "../components/SuggestedJobs/SuggestedJobs";

const JobDetailsPage = () => {
  const { name } = useParams();
  const [data, setData] = useState(null);
  const jobName = name.replace(/-/g, " ");

  useEffect(() => {
    const data = jobData.find((i) => i.name === jobName);
    setData(data);
  });

  return (
    <div>
      <Header />
      <JobDetail data={data} />
      {data && <SuggestedJobs data={data} />}
      <Footer />
    </div>
  );
};

export default JobDetailsPage;
