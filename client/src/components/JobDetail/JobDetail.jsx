import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import { IoExit } from "react-icons/io5";
import { BiSolidMessageDetail } from "react-icons/bi";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { debounce } from "@mui/material";

const JobDetail = ({ data }) => {
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);

  const handleMessageSubmit = () => {
    navigate("/inbox?conversation=kngwkenrgmnd387yjaer");
  };

  const handleApplyJob = debounce((id) => {
    console.log({
      user_id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phoneNumber,
      resume: user.resume,
    });

    try {
      axios
        .post(`${server}/job/applyJobs/${id}`, {
          user_id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phoneNumber,
          resume: user.resume,
        })
        .then((res) => {
          toast.success("Application submitted successfully!");
        })
        .catch((err) => {
          if (err.response) {
            toast.warning(
              `${err.response.data.message || "Something went wrong!"}`
            );
            // navigate("/profile");
            console.log(err.response.data);
          } else {
            toast.error("Request failed. Please try again.");
          }
        });
    } catch (error) {
      console.log(error);
    }
  });

  if (!data) return null; // Add early return if data is not available

  return (
    <div className="bg-white">
      <div className={`${styles.section} w-[90%] 800pc:w-[80%]`}>
        <div className="w-full py-5">
          <div className="block w-full 800px:flex">
            <div className="w-full 800px:w-[50%]">
              <div className="w-full flex">
                <div className={` cursor-pointer`}>
                  <img
                    src={data ? data.image : ""}
                    alt=""
                    className="h-auto rounded-xl"
                    onClick={() => setSelect(0)}
                  />
                </div>
                {/* <div
                  className={`${select === 1 ? "border" : null} cursor-pointer`}
                >
                  <img
                    src={data.image_Url ? data.image_Url[1].url : ""}
                    alt=""
                    className="h-[200px]"
                    onClick={() => setSelect(1)}
                  />
                </div> */}
              </div>
            </div>
            <div className="w-full ml-10 800px:w-[50%] pt-5">
              <Link to={`/company/${data.employer._id}`}>
                <div className="flex items-center py-8">
                  <img
                    src={data.employer ? data.employer.avatar : ""}
                    alt=""
                    className="w-[50px] h-[50px] rounded-full mr-2"
                  />
                  <div>
                    <h3 className={`${styles.shop_name} py-1`}>
                      {data.employer
                        ? data.employer.companyName
                        : "Company Name"}
                    </h3>
                    <h5 className="pb-3 text-[15px]">
                      {/* ({data.shop.ratings}) Ratings */}
                    </h5>
                  </div>
                </div>
              </Link>

              <h1 className={`${styles.productTitle}`}>{data.title}</h1>
              <p>{data.description}</p>
              <div className="font-bold mt-5 text-[20px]">
                Required Skills :{" "}
                <span className="font-normal text-lg">{data.skills}</span>
              </div>
              <div className="flex flex-row gap-5">
                <div
                  className={`${styles.button} mt-6 rounded h-11 flex items-center`}
                  onClick={() => handleApplyJob(data._id)}
                >
                  <span className="text-[#fff] flex flex-row gap-3">
                    Apply
                    <IoExit size={25} />
                  </span>{" "}
                </div>
                <div
                  className={`${styles.button} mt-6 rounded h-11 flex items-center`}
                >
                  <span
                    onClick={handleMessageSubmit}
                    className="text-[#fff] flex flex-row gap-3"
                  >
                    Message
                    <BiSolidMessageDetail size={24} />
                  </span>{" "}
                </div>
                <div className="mt-7">
                  {click ? (
                    <AiFillHeart
                      size={30}
                      className="cursor-pointer"
                      onClick={() => setClick(!click)}
                      color={click ? "red" : "#333"}
                      title="Remove from wishlist"
                    />
                  ) : (
                    <AiOutlineHeart
                      size={30}
                      className="cursor-pointer"
                      onClick={() => setClick(!click)}
                      color={click ? "red" : "#333"}
                      title="Add to wishlist"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <JobDetailsInfo data={data} />
        <br />
        <br />
      </div>
    </div>
  );
};

const JobDetailsInfo = ({ data }) => {
  const [active, setActive] = useState(1);

  return (
    <>
      <div className="bg-[#f5f6fb] px-3 800px:px-10 py-2 rounded-lg">
        <div className="w-full flex justify-between border-b pt-10 pb-2">
          <div className="relative">
            <h5
              className="text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
              onClick={() => setActive(1)}
            >
              Job Details
            </h5>
            {active === 1 ? (
              <div className={`${styles.active_indicator}`} />
            ) : null}
          </div>
          <div className="relative">
            <h5
              className="text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
              onClick={() => setActive(2)}
            >
              Job Reviews
            </h5>
            {active === 2 ? (
              <div className={`${styles.active_indicator}`} />
            ) : null}
          </div>
          <div className="relative">
            <h5
              className="text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
              onClick={() => setActive(3)}
            >
              Company Info
            </h5>
            {active === 3 ? (
              <div className={`${styles.active_indicator}`} />
            ) : null}
          </div>
        </div>
        {active === 1 ? (
          <div className="flex flex-wrap gap-7 py-2 text-[18px] leading-8 pb-10">
            {[
              { label: "Job Category", value: data.category },
              { label: "Job Location", value: data.location },
              { label: "Location Type", value: data.locationType },
              { label: "Job Type", value: data.jobType },
              { label: "Salary", value: data.salary },
              { label: "Experience", value: data.experience },
              { label: "Education", value: data.education },
              { label: "Total Vacancy", value: data.vacancy },
              { label: "Posted on", value: data.createdAt },
              { label: "Deadline", value: data.date },
            ].map((item, index) => (
              <div key={index} className="flex-1 min-w-[200px]">
                <div className="font-bold text-[#000] text-[18px] leading-5">
                  {item.label} :{" "}
                  <span className="font-normal">
                    {item.value ? item.value : "No details available."}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : null}

        {active === 2 ? (
          <div className="w-full justify-center min-h-[40vh] flex items-center">
            <p>No Reviews Yet!!</p>
          </div>
        ) : null}
        {active === 3 && (
          <>
            <div className="w-full block 800px:flex p-5">
              <div className="w-full 800px:w-[50%]">
                <div className="flex items-center">
                  <img
                    src={data.employer ? data.employer.avatar : ""}
                    alt=""
                    className="w-[50px] h-[50px] rounded-full"
                  />
                  <div className="pl-3">
                    <h4 className={`${styles.shop_name}`}>
                      {data.employer
                        ? data.employer.companyName
                        : "Company Name"}
                    </h4>
                    <h5 className="pb-2 text-[15px]">
                      {/* ({data.shop.ratings}) Ratings */}
                    </h5>
                  </div>
                </div>
                <p className="pt-2">
                  {data.employer
                    ? data.employer.description
                    : "No description available."}
                </p>
              </div>
              <div className="w-full 800px:w-[50%] mt-5 800px:mt-0 800px:flex flex-col items-end">
                <h5 className="font-[600]">
                  Joined on:{" "}
                  <span className="font-[400]">
                    {data.employer
                      ? data.employer.createdAt
                      : "Date not available"}
                  </span>
                </h5>
                <h5 className="font-[600]">
                  Total Jobs posted:{" "}
                  <span className="font-[400]">
                    {/* {data.employer ? data.employer.totalJobs : "N/A"} */}10
                  </span>
                </h5>
                <h5 className="font-[600]">
                  Total Reviews:{" "}
                  <span className="font-[400]">
                    {data.employer ? data.employer.totalReviews : "N/A"}
                  </span>
                </h5>
                <Link to={`/company/${data.employer._id}`}>
                  <div
                    className={`${styles.button} rounded-lg h-[39.5px] mt-3`}
                  >
                    <h4 className="text-white">Company Profile</h4>
                  </div>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default JobDetail;
