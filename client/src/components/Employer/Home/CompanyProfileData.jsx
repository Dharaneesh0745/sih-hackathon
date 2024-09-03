import React, { useState } from "react";
// import { jobData } from "../../../data/";

const CompanyProfileData = () => {
  const [active, setActive] = useState(1);

  return (
    <>
      <div className="w-full">
        <div className="flex w-full items-center">
          <div className="flex items-center">
            <h5
              className={`font-[600] text-[20px] ${
                active === 1 ? "text-red-500" : "text-[#333]"
              }  cursor-pointer pr-[30px]`}
              onClick={() => setActive(1)}
            >
              Job Openings
            </h5>
          </div>
          <div className="flex items-center">
            <h5
              className={`font-[600] text-[20px] ${
                active === 2 ? "text-red-500" : "text-[#333]"
              }  cursor-pointer pr-[30px]`}
              onClick={() => setActive(2)}
            >
              Upcoming Events
            </h5>
          </div>
          <div className="flex items-center">
            <h5
              className={`font-[600] text-[20px] ${
                active === 3 ? "text-red-500" : "text-[#333]"
              }  cursor-pointer pr-[30px]`}
              onClick={() => setActive(3)}
            >
              Company Reviews
            </h5>
          </div>
        </div>

        <br />
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-12 border-0">
          {/* {jobData} */}
        </div>
      </div>
    </>
  );
};

export default CompanyProfileData;
