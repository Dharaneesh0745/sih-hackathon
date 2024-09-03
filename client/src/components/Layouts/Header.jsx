import React, { useState } from "react";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { categoriesData, jobData } from "../../data/data";
import { AiOutlineHeart, AiOutlineSearch } from "react-icons/ai";
import {
  IoIosArrowDown,
  IoIosArrowForward,
  IoMdNotifications,
} from "react-icons/io";
import { BiMenuAltLeft, BiSolidMessageDetail } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import DropDown from "./DropDown";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import { backend_API_endpoint } from "../../server";
import Notification from "../Notification/Notification";
import Wishlist from "../Wishlist/Wishlist";
import { RxCross1 } from "react-icons/rx";

const Header = ({ activeHeading }) => {
  const { isAuthenticated, user, isLoading } = useSelector(
    (state) => state.user
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [dropDown, setDropDown] = useState(false);
  const [active, setActive] = useState(false);

  const [openNotification, setOpenNotification] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);

  const [open, setOpen] = useState(false);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filterJobs =
      jobData &&
      jobData.filter((job) =>
        job.name.toLowerCase().includes(term.toLowerCase())
      );
    setSearchData(filterJobs);
  };

  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  return (
    <>
      {isLoading ? null : (
        <>
          <div className={`${styles.section}`}>
            <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between">
              <div>
                <Link to="/home">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2MM3d3wXnnH-eA0UrWsYyXCfBLIPSOY-WAQ&s"
                    alt=""
                    className="h-10"
                  />
                </Link>
              </div>
              {/* search box */}
              <div className="w-[50%] relative">
                <input
                  type="text"
                  placeholder="Search Jobs..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="h-[40px] w-full pb-0.5 px-5 border-black border-[2px] rounded-full"
                />
                <AiOutlineSearch
                  size={23}
                  className="absolute right-3 top-2 cursor-pointer"
                />
                {searchData && searchData.length !== 0 ? (
                  <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
                    {searchData.map((i, index) => {
                      const d = i.name;
                      const jobs_name = d.replace(/\s+/g, "-");
                      return (
                        <Link
                          to={`/jobs/${jobs_name}`}
                          key={index} // Adding a unique key prop
                          className="block my-2"
                        >
                          <div className="w-full flex items-start py-3">
                            <img
                              src={i.image_Url[0].url}
                              alt=""
                              className="w-[40px] h-[40px] mr-[10px]"
                            />
                            <h1>{i.name}</h1>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                ) : null}
              </div>
              <div className="w-[150px] bg-black h-[40px] my-3 flex items-center justify-center rounded-xl cursor-pointer">
                <Link to="/create">
                  <h1 className="text-[#fff] flex pb-0.5 items-center">
                    Create Events
                    <IoIosArrowForward className="ml-1 mt-0.5" />
                  </h1>
                </Link>
              </div>
            </div>
          </div>
          <div
            className={`${
              active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
            } transition hidden 800px:flex items-center justify-between w-full bg-[#3321c8] h-[70px]`}
          >
            <div
              className={`${styles.section} relative ${styles.noramlFlex} justify-between`}
            >
              {/* categories */}
              <div>
                <div
                  onClick={() => setDropDown(!dropDown)}
                  className="relative h-[60px] mt-[10px] w-[270px] hidden 1000px:block"
                >
                  <BiMenuAltLeft
                    size={30}
                    className="absolute top-4 cursor-pointer left-2"
                  />
                  <button
                    className={`h-[100%] w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-xl`}
                  >
                    All Categories
                  </button>
                  <IoIosArrowDown
                    size={20}
                    className="absolute right-2 top-5 cursor-pointer"
                  />
                  {dropDown ? (
                    <DropDown
                      categoriesData={categoriesData}
                      setDropDown={setDropDown}
                    />
                  ) : null}
                </div>
              </div>
              {/* nav items */}
              <div className={`${styles.noramlFlex}`}>
                <Navbar active={activeHeading} />
              </div>
              {/* navbar icons */}
              <div className="flex gap-3">
                <div className={`${styles.normalFlex}`}>
                  <div className="relative cursor-pointer mt-2 mr[15px]">
                    <BiSolidMessageDetail size={28} color="rgb(255 255 255)" />
                    <span className="absolute -right-1 -top-1 rounded-full bg-pink-500 w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                      0{" "}
                    </span>
                  </div>
                </div>
                <div className={`${styles.normalFlex}`}>
                  <div
                    className="relative cursor-pointer mt-2 mr[15px]"
                    onClick={() => setOpenWishlist(!openWishlist)}
                  >
                    <AiOutlineHeart size={28} color="rgb(255 255 255)" />
                    <span className="absolute -right-1 -top-1 rounded-full bg-pink-500 w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                      0{" "}
                    </span>
                  </div>
                </div>
                <div className={`${styles.normalFlex}`}>
                  <div
                    className="relative cursor-pointer mt-2 mr[15px]"
                    onClick={() => setOpenNotification(true)}
                  >
                    <IoMdNotifications size={28} color="rgb(255 255 255)" />
                    <span className="absolute right-0 -top-1 rounded-full bg-pink-500 w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                      0{" "}
                    </span>
                  </div>
                </div>
                {/* <div className={`${styles.normalFlex}`}>
                  <div className="relative cursor-pointer mr[15px]">
                    <IoFileTrayFull size={28} color="rgb(255 255 255)" />
                  </div>
                </div> */}
                <div className={`${styles.normalFlex}`}>
                  <div className="relative cursor-pointer mr[15px]">
                    {/* {isAuthenticated ? (
                  <Link to={"/profile"}>
                    <img src={`${backend_API_endpoint}${user.avatar}`} alt="" />
                  </Link>
                ) : (
                  <Link to={"/login"}>
                    <CgProfile size={26} color="rgb(255 255 255)" />
                  </Link>
                )} */}
                    {isAuthenticated ? (
                      <Link to={`/profile`}>
                        <img
                          src={`${backend_API_endpoint}${user.avatar}`}
                          className="w-[45px] h-[46px] rounded-full"
                          alt=""
                        />
                        {/* <p>{user.email}</p> */}
                      </Link>
                    ) : (
                      <Link to="/login">
                        <CgProfile size={28} color="rgb(255 255 255 / 83%)" />
                      </Link>
                    )}
                  </div>
                </div>

                {/* notification sidebar */}
                {openNotification ? (
                  <Notification setOpenNotification={setOpenNotification} />
                ) : null}

                {/* wishlist sidebar */}
                {openWishlist ? (
                  <Wishlist setOpenWishlist={setOpenWishlist} />
                ) : null}
              </div>
            </div>
          </div>

          {/* mobile screen header */}
          <div className="w-[100%] h-[70px] fixed bg-white z-50 top-0 left-0 shadow-xl 800px:hidden">
            <div className="w-full flex items-center justify-between">
              <div>
                <BiMenuAltLeft
                  size={40}
                  className="ml-4 mt-3"
                  onClick={() => setOpen(true)}
                />
              </div>
              <div>
                <Link to="/home">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2MM3d3wXnnH-eA0UrWsYyXCfBLIPSOY-WAQ&s"
                    alt=""
                    className="h-10 mt-4"
                  />
                </Link>
              </div>
              <div>
                <div
                  className="relative cursor-pointer mt-2 mr-5 mr[15px]"
                  onClick={() => setOpenWishlist(true)}
                >
                  <AiOutlineHeart size={28} color="black" />
                  <span className="absolute -right-1 -top-1 rounded-full bg-pink-500 w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                    0{" "}
                  </span>
                </div>
              </div>
            </div>

            {/* mobile screen header sidebar */}
            {open && (
              <div className="fixed w-full bg-[#0000005f] z-20 h-screen top-0 left-0">
                <div className="fixed w-[60%] bg-white h-screen top-0 left-0 z-10 overflow-y-auto">
                  <div className="w-full justify-between flex pr-3">
                    <div>
                      <div className="relative mr-[15px]">
                        <AiOutlineHeart size={30} className="mt-5 ml-3" />
                        <span className="absolute -right-1 -top-1 rounded-full bg-pink-500 w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                          0{" "}
                        </span>
                      </div>
                    </div>
                    <RxCross1
                      size={30}
                      className="ml-4 mt-5"
                      onClick={() => setOpen(false)}
                    />
                  </div>

                  <div className="my-8 w-[92%] m-auto h-[40px]">
                    <input
                      type="text"
                      placeholder="Search Jobs..."
                      value={searchTerm}
                      onChange={handleSearchChange}
                      className="h-[40px] w-full pb-0.5 px-5 border-black border-[2px] rounded-full"
                    />
                    <AiOutlineSearch
                      size={23}
                      className="absolute right-5 top-[90px] cursor-pointer"
                    />
                    {searchData && searchData.length !== 0 ? (
                      <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
                        {searchData.map((i, index) => {
                          const d = i.name;
                          const jobs_name = d.replace(/\s+/g, "-");
                          return (
                            <Link
                              to={`/job/${jobs_name}`}
                              key={index} // Adding a unique key prop
                              className="block my-2"
                            >
                              <div className="w-full flex items-start py-3">
                                <img
                                  src={i.image_Url[0].url}
                                  alt=""
                                  className="w-[40px] h-[40px] mr-[10px]"
                                />
                                <h1>{i.name}</h1>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    ) : null}
                  </div>

                  <Navbar active={activeHeading} />

                  <div
                    onClick={test}
                    className={`${styles.button} mx-auto rounded-lg`}
                  >
                    <Link to={"/create"} className="flex">
                      <h1 className="text-white mb-1 flex items-center">
                        Create Events
                      </h1>
                      <IoIosArrowForward className="ml-1 mt-1" color="white" />
                    </Link>
                  </div>
                  <br />
                  <div className="flex w-full mb-10 justify-center">
                    {!isAuthenticated ? (
                      <>
                        <Link
                          to={"/login"}
                          className="text-[18px] pr-[5px] text-[#000000b7]"
                        >
                          Login /
                        </Link>
                        <Link
                          to={"/signup"}
                          className="text-[18px] pr-[10px] text-[#000000b7]"
                        >
                          Sign Up
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link to={`/profile/${user}`}>
                          <img
                            src={`${backend_API_endpoint}${user.avatar}`}
                            className="w-[45px] h-[46px] rounded-full"
                            alt=""
                          />
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Header;
