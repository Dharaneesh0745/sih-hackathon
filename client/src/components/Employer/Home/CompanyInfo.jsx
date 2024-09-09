import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { backend_API_endpoint, server } from "../../../server";
import styles from "../../../styles/styles";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from "../../Layouts/Loader";

const CompanyInfo = ({ isOwner }) => {
  const { employer } = useSelector((state) => state.employer);

  const { id } = useParams();
  const [indEmployer, setIndEmployer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // console.log(id);
  useEffect(() => {
    const getAnEmployer = async () => {
      try {
        const response = await axios.get(
          `${server}/employer/getIndEmployer/${id}`
          // { withCredentials: true }
        );
        setIndEmployer(response.data.employer);
        setLoading(false);
        console.log("Employer data:", response.data.employer);
      } catch (error) {
        setError(error.response ? error.response.data : error.message);
        setLoading(false);
      }
    };

    getAnEmployer();
  }, [id]);

  if (loading)
    return (
      <div>
        <Loader />
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  // console.log(indEmployer);

  const logoutHandler = () => {
    axios.get(`${server}/employer/logout`, {
      withCredentials: true,
    });
    window.location.reload();
    window.location.href = "/employer/login";
  };

  return (
    <>
      <div className="w-full py-5">
        <div className="w-full flex items-center justify-center">
          <img
            src={`${indEmployer.avatar}`}
            alt=""
            className="w-[150px] h-[150px] object-cover rounded-full"
          />
        </div>
        <h3 className="text-center py-2 mt-3 text-[20px]">
          {indEmployer.companyName}
        </h3>
        <p className="text-[16px] text-[#000000a6] p-[10px] flex items-center text-center">
          {/* {employer.description} */}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
          illum quibusdam inventore. Ad exercitationem provident non maxime.
          Illum, beatae? Minima dolores repudiandae consequatur doloribus quis
          necessitatibus quia possimus ab! Blanditiis.
        </p>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Address</h5>
        <h4 className="text-[#000000a6]">
          {/* {indEmployer.address} */}
          123, Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </h4>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Employer Mobile Number</h5>
        <h4 className="text-[#000000a6]">{indEmployer.employerPhone}</h4>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Company Size</h5>
        <h4 className="text-[#000000a6]">
          {/* {employer.employerPhone} */}
          10-50 Employees
        </h4>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Company Ratings</h5>
        <h4 className="text-[#000000a6]">
          {/* {employer.employerPhone} */}
          4.7/5
        </h4>
      </div>
      <div className="p-3 mb-3">
        <h5 className="font-[600]">Joined On</h5>
        <h4 className="text-[#000000a6]">
          {indEmployer.createdAt.slice(0, 10)}
        </h4>
      </div>
      {employer && (
        <>
          <div className="pt-3 px-4">
            <div
              className={`${styles.button}  !w-full !h-[42px] !rounded-[5px]`}
            >
              <span className="text-white">Edit Company Info</span>
            </div>
          </div>
          <div className="py-0 px-4">
            <div
              className={`${styles.button}  !w-full !h-[42px] !rounded-[5px]`}
              onClick={logoutHandler}
            >
              <span className="text-white">Logout</span>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CompanyInfo;
