import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import styles from "../../../styles/styles";
import { AiOutlineMessage } from "react-icons/ai";
import { backend_API_endpoint } from "../../../server";
import { Link } from "react-router-dom";

const JobDetailsCard = ({ setOpen, data }) => {
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(false);

  const handleMessageSubmit = () => {};

  return (
    <div className="bg-[#fff]">
      {data ? (
        <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center">
          <div className="w-[90%] 800px:w-[60%] h-[90vh] overflow-y-scroll 800px:h-[75vh] bg-white rounded-xl shadow-md relative p-4">
            <RxCross1
              size={24}
              className="cursor-pointer absolute right-3 top-3 z-50"
              onClick={() => setOpen(false)}
            />

            <div className="block w-full 800px:flex">
              <div className="w-full 800px:w-[50%]">
                {/* <img src={`${backend_API_endpoint}/${data.images[0]}`} alt="" /> */}
                <Link to={`/company/${data.employer._id}`}>
                  <div className="flex">
                    <img
                      src={`${data.employer.avatar}`}
                      alt=""
                      className="w-[50px] h-[50px] rounded-full mr-2"
                    />
                    <div>
                      <h3 className={`${styles.shop_name}`}>
                        {data.employer.companyName}
                      </h3>
                      <h5 className="pb-3 text-[15px]">
                        {/* ({data.shop.ratings}) Ratings */}
                      </h5>
                    </div>
                  </div>
                </Link>
                <div
                  className={`${styles.button} bg-[#000] mt-4 rounded h-11`}
                  onClick={handleMessageSubmit}
                >
                  <span className="text-[#fff] flex items-center">
                    Send Message <AiOutlineMessage className="ml-1" />
                  </span>
                </div>
                <h5 className="text-[16px] text-[red] mt-5">10 Applied</h5>
                <br />
                <hr />
                <br />
                <h5 className="text-[16px]">Job Type: {data.jobType}</h5>
                <h5 className="text-[16px]">Experience: {data.experience}</h5>
                <h5 className="text-[16px]">Salary: {data.salary}</h5>
                <h5 className="text-[16px]">Location: {data.location}</h5>
                <h5 className="text-[16px]">Deadline: {data.deadline}</h5>
              </div>

              <div className="w-full 800px:w-[50%] pt-5 pl-[5px] pr-[5px]">
                <h1 className={`${styles.productTitle} text-[20px]`}>
                  {data.title}
                </h1>
                <p>{data.description}</p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default JobDetailsCard;
