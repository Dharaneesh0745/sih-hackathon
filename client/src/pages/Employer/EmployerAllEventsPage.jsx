import React from "react";
import DashboardHeader from "../../components/Employer/Layouts/DashboardHeader";
import DashboardSidebar from "../../components/Employer/Layouts/DashboardSidebar";
import EmployerAllEvents from "../../components/Employer/EmployerAllEvents/EmployerAllEvents";

const EmployerAllEventsPage = () => {
  return (
    <>
      <DashboardHeader />
      <div className="flex justify-between w-full">
        <div className="800px:w-[250px] w-[60px]">
          <DashboardSidebar active={5} />
        </div>
        <div className="w-full justify-center flex">
          <EmployerAllEvents />
        </div>
      </div>
    </>
  );
};

export default EmployerAllEventsPage;
