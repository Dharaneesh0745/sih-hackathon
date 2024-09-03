import React from "react";
import { useSelector } from "react-redux";
import { backend_API_endpoint } from "../../../server";
import styles from "../../../styles/styles";

const CompanyInfo = ({ isOwner }) => {
  const { employer } = useSelector((state) => state.employer);

  const logoutHandler = () => {};

  return (
    <>
      <div className="w-full py-5">
        <div className="w-full flex items-center justify-center">
          <img
            src={`${backend_API_endpoint}${employer?.avatar}`}
            alt=""
            className="w-[150px] h-[150px] object-cover rounded-full"
          />
        </div>
        <h3 className="text-center py-2 mt-3 text-[20px]">
          {employer.companyName}
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
          {/* {employer.address} */}
          123, Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </h4>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Employer Mobile Number</h5>
        <h4 className="text-[#000000a6]">{employer.employerPhone}</h4>
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
      <div className="p-3">
        <h5 className="font-[600]">Joined On</h5>
        <h4 className="text-[#000000a6]">{employer.createdAt.slice(0, 10)}</h4>
      </div>
      {isOwner && (
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
