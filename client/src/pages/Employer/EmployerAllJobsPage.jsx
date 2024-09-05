import React from "react";
import DashboardHeader from "../../components/Employer/Layouts/DashboardHeader";
import DashboardSidebar from "../../components/Employer/Layouts/DashboardSidebar";
import EmployerAllJobs from "../../components/Employer/EmployerAllJobs/EmployerAllJobs";

const EmployerAllJobsPage = () => {
  return (
    <>
      <DashboardHeader />
      <div className="flex justify-between w-full">
        <div className="800px:w-[250px] w-[60px]">
          <DashboardSidebar active={3} />
        </div>
        <div className="w-full justify-center flex">
          <EmployerAllJobs />
        </div>
      </div>
    </>
  );
};

export default EmployerAllJobsPage;
