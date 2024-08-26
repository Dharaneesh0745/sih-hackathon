import React from "react";
import DashboardHeader from "../../components/Employer/Layouts/DashboardHeader";
import DashboardSidebar from "../../components/Employer/Layouts/DashboardSidebar";
import EmployerDashboard from "../../components/Employer/Dashboard/EmployerDashboard";

const EmployerDashboardPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-center justify-between w-full">
        <div className="w-[330px]">
          <DashboardSidebar active={1} />
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboardPage;
