import React from "react";
import { FaFileAlt } from "react-icons/fa";
import { MdMessage, MdWorkHistory } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { backend_API_endpoint } from "../../../server";

const DashboardHeader = () => {
  const { employer } = useSelector((state) => state.employer);
  return (
    <div className="w-full h-[80px] bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4">
      <div>
        <Link to="/employer/dashboard">
          {/* <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2MM3d3wXnnH-eA0UrWsYyXCfBLIPSOY-WAQ&s"
            alt=""
            className="h-10"
          /> */}
          <h1 className="text-2xl font-bold">Dream Lander</h1>
        </Link>
      </div>
      <div className="flex items-center">
        <div className="flex items-center mr-4">
          <Link to="/employer/jobs" className="800px:block hidden">
            <MdWorkHistory
              color="#555"
              size={30}
              className="mx-3 cursor-pointer"
            />
          </Link>
          <Link to="/employer/applications" className="800px:block hidden">
            <FaFileAlt color="#555" size={25} className="mx-3 cursor-pointer" />
          </Link>
          <Link to="/employer/messages" className="800px:block hidden">
            <MdMessage color="#555" size={30} className="mx-3 cursor-pointer" />
          </Link>
          <Link to={`/employer/${employer._id}`}>
            <img
              src={`${employer.avatar}`}
              alt=""
              className="w-[50px] h-[50px] mx-3 rounded-full object-cover"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
