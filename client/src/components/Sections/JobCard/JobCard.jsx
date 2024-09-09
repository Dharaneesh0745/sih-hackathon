import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import { AiFillHeart, AiOutlineEye, AiOutlineHeart } from "react-icons/ai";
import JobDetailsCard from "../JobDetailsCard/JobDetailsCard";
import { backend_API_endpoint } from "../../../server";

const JobCard = ({ data }) => {
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);

  const { _id, employer = {}, title = "No title" } = data;
  // console.log(data._id);
  const { companyName = "No company name" } = employer;

  return (
    <div className="w-full h-auto bg-[#fff] rounded-lg shadow-sm p-3 relative cursor-pointer">
      <div className="flex justify-end"></div>
      <Link to={`/job/${data._id}`}>
        <img
          src={`${data.image}`}
          alt={title}
          className="w-full h-[170px] object-contain"
        />
      </Link>
      <Link to={`/company/${employer._id}`}>
        <h5 className={`${styles.shop_name} text-center`}>{companyName}</h5>
      </Link>
      <Link to={`/job/${data._id}`}>
        <h4 className="pb-3 font-[500] text-center">
          {title.length > 40 ? title.slice(0, 40) + "..." : title}
        </h4>
        <div className="py-2 flex items-center justify-center">
          <div className="flex gap-3">
            <span className="font-[400] text-[17px] text-red-500">
              Openings : <span className="text-green-600">{data.vacancy}</span>
            </span>
            <span className="font-[400] text-[17px] text-red-500">
              Applied : <span className="text-green-600">{data.vacancy}</span>
            </span>
          </div>
        </div>
      </Link>

      {/* side options */}
      <div>
        {click ? (
          <AiFillHeart
            size={22}
            className="cursor-pointer absolute right-2 top-5"
            onClick={() => setClick(!click)}
            color={click ? "red" : "#333"}
            title="Remove from wishlist"
          />
        ) : (
          <AiOutlineHeart
            size={22}
            className="cursor-pointer absolute right-2 top-5"
            onClick={() => setClick(!click)}
            color={click ? "red" : "#333"}
            title="Add to wishlist"
          />
        )}
        <AiOutlineEye
          size={22}
          className="cursor-pointer absolute right-2 top-14"
          onClick={() => setOpen(!open)}
          color="#333"
          title="Quick View"
        />

        {/* product details card component */}
        {open ? <JobDetailsCard setOpen={setOpen} data={data} /> : null}
      </div>
    </div>
  );
};

export default JobCard;
