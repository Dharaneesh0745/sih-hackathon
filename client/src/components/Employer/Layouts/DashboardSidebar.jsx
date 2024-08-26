import React from "react";
import { Link } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";

const DashboardSidebar = ({ active }) => {
  return (
    <>
      <div className="w-full h-[89vh] bg-white shadow-sm overflow-y-scroll sticky top-0 left-0 z-10">
        {/* single item */}
        <div className="w-full flex items-center p-4">
          <Link to={"/employer/dashboard"} className="w-full flex items-center">
            <RxDashboard size={30} color="#555" />
            <h5
              className={`pl-2 text-[18px] font-[400] ${
                active === 1 ? "text-[crimson]" : "text-[#555]"
              }`}
            >
              Dashboard
            </h5>
          </Link>
        </div>
      </div>
    </>
  );
};

export default DashboardSidebar;
