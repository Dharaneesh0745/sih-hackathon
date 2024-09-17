import React from "react";
import { Link } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { GoFileSubmodule } from "react-icons/go";
import { ImFolderOpen } from "react-icons/im";
import { LuUpload } from "react-icons/lu";
import { MdEventNote } from "react-icons/md";
import { MdAddchart } from "react-icons/md";
import { TbMessageFilled } from "react-icons/tb";
import { IoMdSettings } from "react-icons/io";
import { RiDiscountPercentFill } from "react-icons/ri";

const DashboardSidebar = ({ active }) => {
  return (
    <>
      <div className="w-full h-[89vh] bg-white shadow-sm overflow-y-scroll sticky top-0 left-0 z-10">
        {/* single item */}
        <div className="w-full flex items-center p-4">
          <Link to={"/employer/dashboard"} className="w-full flex items-center">
            <RxDashboard size={30} color="#555" />
            <h5
              className={`800px:block hidden pl-2 text-[18px] font-[400] ${
                active === 1 ? "text-[crimson]" : "text-[#555]"
              }`}
            >
              Dashboard
            </h5>
          </Link>
        </div>

        <div className="w-full flex items-center p-4">
          <Link
            to={"/employer/all-applications"}
            className="w-full flex items-center"
          >
            <GoFileSubmodule size={30} color="#555" />
            <h5
              className={`800px:block hidden pl-2 text-[18px] font-[400] ${
                active === 2 ? "text-[crimson]" : "text-[#555]"
              }`}
            >
              All Applications
            </h5>
          </Link>
        </div>

        <div className="w-full flex items-center p-4">
          <Link to={"/employer/allJobs"} className="w-full flex items-center">
            <ImFolderOpen size={30} color="#555" />
            <h5
              className={`800px:block hidden pl-2 text-[18px] font-[400] ${
                active === 3 ? "text-[crimson]" : "text-[#555]"
              }`}
            >
              All Jobs
            </h5>
          </Link>
        </div>

        <div className="w-full flex items-center p-4">
          <Link
            to={"/employer/create-job"}
            className="w-full flex items-center"
          >
            <LuUpload size={30} color="#555" />
            <h5
              className={`800px:block hidden pl-2 text-[18px] font-[400] ${
                active === 4 ? "text-[crimson]" : "text-[#555]"
              }`}
            >
              Create Jobs
            </h5>
          </Link>
        </div>

        <div className="w-full flex items-center p-4">
          <Link to={"/employer/allEvents"} className="w-full flex items-center">
            <MdEventNote size={30} color="#555" />
            <h5
              className={`800px:block hidden pl-2 text-[18px] font-[400] ${
                active === 5 ? "text-[crimson]" : "text-[#555]"
              }`}
            >
              All Events
            </h5>
          </Link>
        </div>

        <div className="w-full flex items-center p-4">
          <Link
            to={"/employer/create-event"}
            className="w-full flex items-center"
          >
            <MdAddchart size={30} color="#555" />
            <h5
              className={`800px:block hidden pl-2 text-[18px] font-[400] ${
                active === 6 ? "text-[crimson]" : "text-[#555]"
              }`}
            >
              Create Event
            </h5>
          </Link>
        </div>

        <div className="w-full flex items-center p-4">
          <Link
            to={"/employer/allCoupouns"}
            className="w-full flex items-center"
          >
            <RiDiscountPercentFill size={30} color="#555" />
            <h5
              className={`800px:block hidden pl-2 text-[18px] font-[400] ${
                active === 7 ? "text-[crimson]" : "text-[#555]"
              }`}
            >
              All Coupouns
            </h5>
          </Link>
        </div>

        <div className="w-full flex items-center p-4">
          <Link to={"/employer/inbox"} className="w-full flex items-center">
            <TbMessageFilled size={30} color="#555" />
            <h5
              className={`800px:block hidden pl-2 text-[18px] font-[400] ${
                active === 8 ? "text-[crimson]" : "text-[#555]"
              }`}
            >
              Inbox
            </h5>
          </Link>
        </div>

        <div className="w-full flex items-center p-4">
          <Link to={"/employer/settings"} className="w-full flex items-center">
            <IoMdSettings size={30} color="#555" />
            <h5
              className={`800px:block hidden pl-2 text-[18px] font-[400] ${
                active === 9 ? "text-[crimson]" : "text-[#555]"
              }`}
            >
              Settings
            </h5>
          </Link>
        </div>
      </div>
    </>
  );
};

export default DashboardSidebar;
