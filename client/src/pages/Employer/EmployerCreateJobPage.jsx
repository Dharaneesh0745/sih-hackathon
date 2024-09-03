import React from "react";
import DashboardHeader from "../../components/Employer/Layouts/DashboardHeader";
import DashboardSidebar from "../../components/Employer/Layouts/DashboardSidebar";
import EmployerCreateJob from "../../components/Employer/EmployerCreateJob/EmployerCreateJob";

const EmployerCreateJobPage = () => {
  return (
    <>
      <DashboardHeader />
      <div className="flex items-center justify-between w-full">
        <div className="800px:w-[250px] w-[60px]">
          <DashboardSidebar active={4} />
        </div>
        <div className="w-full justify-center flex">
          <EmployerCreateJob />
        </div>
      </div>
    </>
  );
};

export default EmployerCreateJobPage;
