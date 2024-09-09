import React from "react";
import DashboardHeader from "../../components/Employer/Layouts/DashboardHeader";
import DashboardSidebar from "../../components/Employer/Layouts/DashboardSidebar";
import EmployerCreateEvent from "../../components/Employer/EmployerCreateEvent/EmployerCreateEvent";

const EmployerCreateEventPage = () => {
  return (
    <>
      <DashboardHeader />
      <div className="flex items-center justify-between w-full">
        <div className="800px:w-[250px] w-[60px]">
          <DashboardSidebar active={6} />
        </div>
        <div className="w-full justify-center flex">
          <EmployerCreateEvent />
        </div>
      </div>
    </>
  );
};

export default EmployerCreateEventPage;
