import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import { IoExit } from "react-icons/io5";
import { BiSolidMessageDetail } from "react-icons/bi";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const JobDetail = ({ data }) => {
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const navigate = useNavigate();

  const handleMessageSubmit = () => {
    navigate("/inbox?conversation=kngwkenrgmnd387yjaer");
  };

  return (
    <div className="bg-white">
      {data ? (
        <div className={`${styles.section} w-[90%] 800pc:w-[80%]`}>
          <div className="w-full py-5">
            <div className="block w-full 800px:flex">
              <div className="w-full 800px:w-[50%]">
                <img
                  src={data.image_Url[select].url}
                  className="w-[100%]"
                  alt=""
                />
                <div className="w-full flex">
                  <div
                    className={`${
                      select === 0 ? "border" : null
                    } cursor-pointer`}
                  >
                    <img
                      src={data?.image_Url[0].url}
                      alt=""
                      className="h-[200px]"
                      onClick={() => setSelect(0)}
                    />
                  </div>
                  <div
                    className={`${
                      select === 1 ? "border" : null
                    } cursor-pointer`}
                  >
                    <img
                      src={data?.image_Url[1].url}
                      alt=""
                      className="h-[200px]"
                      onClick={() => setSelect(1)}
                    />
                  </div>
                </div>
              </div>
              <div className="w-full 800px:w-[50%] pt-5">
                <div className="flex items-center py-8">
                  <img
                    src={data.shop.shop_avatar.url}
                    alt=""
                    className="w-[50px] h-[50px] rounded-full mr-2"
                  />
                  <div>
                    <h3 className={`${styles.shop_name} py-1`}>
                      {data.shop.name}
                    </h3>
                    <h5 className="pb-3 text-[15px]">
                      ({data.shop.ratings}) Ratings
                    </h5>
                  </div>
                </div>

                <h1 className={`${styles.productTitle}`}>{data.name}</h1>
                <p>{data.description}</p>
                <div className="flex flex-row gap-5">
                  <div
                    className={`${styles.button} mt-6 rounded h-11 flex items-center`}
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
      ) : null}
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
          <>
            <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio
              accusantium temporibus sunt quis ut ipsum dicta tempore libero.
              Ducimus blanditiis placeat eaque veniam quas saepe impedit
              necessitatibus incidunt alias nesciunt.
            </p>
            <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio
              accusantium temporibus sunt quis ut ipsum dicta tempore libero.
              Ducimus blanditiis placeat eaque veniam quas saepe impedit
              necessitatibus incidunt alias nesciunt.
            </p>
          </>
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
                    src={data.shop.shop_avatar.url}
                    alt=""
                    className="w-[50px] h-[50px] rounded-full"
                  />
                  <div className="pl-3">
                    <h4 className={`${styles.shop_name}`}>{data.shop.name}</h4>
                    <h5 className="pb-2 text-[15px]">
                      ({data.shop.ratings}) Ratings
                    </h5>
                  </div>
                </div>
                <p className="pt-2">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Voluptatem sed ipsam repudiandae quae, autem beatae qui!
                  Adipisci, esse consectetur, quos provident vitae soluta
                  tempora quia corrupti voluptas enim laboriosam atque?
                </p>
              </div>
              <div className="w-full 800px:w-[50%] mt-5 800px:mt-0 800px:flex flex-col items-end">
                <h5 className="font-[600]">
                  Joined on: <span className="font-[500]">7 April, 2005</span>
                </h5>
                <h5 className="font-[600]">
                  Total Jobs posted: <span className="font-[500]">1,000</span>
                </h5>
                <h5 className="font-[600]">
                  Total Reviews: <span className="font-[500]">500</span>
                </h5>
                <Link to="/home">
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