import React from "react";
import DashboardHeader from "../../components/Employer/Layouts/DashboardHeader";
import DashboardSidebar from "../../components/Employer/Layouts/DashboardSidebar";
import EmployerAllEvents from "../../components/Employer/EmployerAllEvents/EmployerAllEvents";
import EmployerAllCoupouns from "../../components/Employer/EmployerAllCoupouns/EmployerAllCoupouns";

const EmployerAllCoupounsPage = () => {
  return (
    <>
      <DashboardHeader />
      <div className="flex justify-between w-full">
        <div className="800px:w-[250px] w-[60px]">
          <DashboardSidebar active={7} />
        </div>
        <div className="w-full justify-center flex">
          {/* <EmployerAllEvents /> */}
          <EmployerAllCoupouns />
        </div>
      </div>
    </>
  );
};

export default EmployerAllCoupounsPage;
