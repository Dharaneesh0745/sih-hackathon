import React from "react";
import DashboardHeader from "../../components/Employer/Layouts/DashboardHeader";
import DashboardSidebar from "../../components/Employer/Layouts/DashboardSidebar";
import EmployerAllApplications from "../../components/Employer/EmployerAllApplications/EmployerAllApplications";

const EmployerAllApplicationsPage = () => {
  return (
    <>
      <DashboardHeader />
      <div className="flex w-full">
        <div className="800px:w-[250px] w-[60px]">
          <DashboardSidebar active={2} />
        </div>
        <div className="w-full flex">
          <EmployerAllApplications />
        </div>
      </div>
    </>
  );
};

export default EmployerAllApplicationsPage;
