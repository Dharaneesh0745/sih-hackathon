import React, { useEffect, useState } from "react";
// import { jobData } from "../../../data/data";
import JobCard from "../../Sections/JobCard/JobCard";
import { Link, useParams } from "react-router-dom";
import styles from "../../../styles/styles";
import axios from "axios";
import { server } from "../../../server";
import { useSelector } from "react-redux";

const CompanyProfileData = ({ isOwner }) => {
  const [active, setActive] = useState(1);
  const [loading, setLoading] = useState(true);
  const { employer } = useSelector((state) => state.employer);
  const { id } = useParams();
  const [jobData, setJobData] = useState([]);

  useEffect(() => {
    axios
      .get(`${server}/job/getAllJobs/${id}`)
      .then((response) => {
        console.log(response.data.jobs); // Log the data here
        setJobData(response.data.jobs);
        setLoading(false);
      })
      .catch((error) => {
        // setError(error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className="w-full">
        <div className="flex w-full items-center justify-between">
          <div className="w-full flex">
            <div className="flex items-center">
              <h5
                className={`font-[600] text-[20px] ${
                  active === 1 ? "text-red-500" : "text-[#333]"
                }  cursor-pointer pr-[30px]`}
                onClick={() => setActive(1)}
              >
                Job Openings
              </h5>
            </div>
            <div className="flex items-center">
              <h5
                className={`font-[600] text-[20px] ${
                  active === 2 ? "text-red-500" : "text-[#333]"
                }  cursor-pointer pr-[30px]`}
                onClick={() => setActive(2)}
              >
                Upcoming Events
              </h5>
            </div>
            <div className="flex items-center">
              <h5
                className={`font-[600] text-[20px] ${
                  active === 3 ? "text-red-500" : "text-[#333]"
                }  cursor-pointer pr-[30px]`}
                onClick={() => setActive(3)}
              >
                Company Reviews
              </h5>
            </div>
          </div>
          <div>
            {employer && (
              <div>
                <Link to={"/employer/dashboard"}>
                  <div className={`${styles.button} rounded-md h-[42px]`}>
                    <span className="text-white">Dashboard</span>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>

        <br />
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-12 border-0">
          {jobData &&
            jobData.map((i, index) => <JobCard data={i} key={index} />)}
        </div>
      </div>
    </>
  );
};

export default CompanyProfileData;
