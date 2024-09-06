import React from "react";
import { BiSolidParty } from "react-icons/bi";
import { SiHyperskill } from "react-icons/si";
import { PiBooksFill, PiExamFill } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import { BsFillCollectionPlayFill } from "react-icons/bs";
import { IoDocuments, IoLogOut, IoPersonSharp } from "react-icons/io5";
import { server } from "../../server";
import axios from "axios";
import { toast } from "react-toastify";
import styles from "../../styles/styles";
import { useSelector } from "react-redux";
import { RiRoadMapFill } from "react-icons/ri";

const ProfileSidebar = ({ active, setActive }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const user_id = user._id;

  const logoutHandler = () => {
    axios
      .get(`${server}/user/logout`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        window.location.reload(true);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  return (
    <>
      <div className="w-full font-bold bg-white shadow-lg rounded-xl p-4 pt-8">
        <div className="text-center w-full mb-5">
          <Link
            to={`/u/${user_id}`}
            className={`${styles.button} 800px:flex hidden mx-auto text-white -mt-1`}
          >
            View Profile
          </Link>
          <Link to={`/u/${user_id}`}>
            <IoPersonSharp size={20} className="mx-auto 800px:hidden" />
          </Link>
        </div>

        <div
          className="flex items-center cursor-pointer w-full mb-8"
          onClick={() => setActive(1)}
        >
          <SiHyperskill size={20} color={active === 2 ? "text-pink-500" : ""} />
          <span
            className={`pl-3 ${
              active === 1 ? "text-pink-500" : ""
            } 800px:block hidden`}
          >
            Edit Profile
          </span>
        </div>

        <div
          className="flex items-center cursor-pointer w-full mb-8"
          onClick={() => setActive(2)}
        >
          <RiRoadMapFill
            size={20}
            color={active === 2 ? "text-pink-500" : ""}
          />
          <span
            className={`pl-3 ${
              active === 2 ? "text-pink-500" : ""
            } 800px:block hidden`}
          >
            My Roadmap
          </span>
        </div>

        <div
          className="flex items-center cursor-pointer w-full mb-8"
          onClick={() => setActive(3)}
        >
          <BsFillCollectionPlayFill
            size={20}
            color={active === 3 ? "text-pink-500" : ""}
          />
          <span
            className={`pl-3 ${
              active === 3 ? "text-pink-500" : ""
            } 800px:block hidden`}
          >
            Enrolled Courses
          </span>
        </div>
        <div
          className="flex items-center cursor-pointer w-full mb-8"
          onClick={() => setActive(4)}
        >
          <PiExamFill size={20} color={active === 4 ? "text-pink-500" : ""} />
          <span
            className={`pl-3 ${
              active === 4 ? "text-pink-500" : ""
            } 800px:block hidden`}
          >
            Tests Taken
          </span>
        </div>
        <div
          className="flex items-center cursor-pointer w-full mb-8"
          onClick={() => setActive(5)}
        >
          <IoDocuments size={20} color={active === 5 ? "text-pink-500" : ""} />
          <span
            className={`pl-3 ${
              active === 5 ? "text-pink-500" : ""
            } 800px:block hidden`}
          >
            Applied Jobs
          </span>
        </div>
        <div
          className="flex items-center cursor-pointer w-full mb-4"
          onClick={() => setActive(6) || logoutHandler()}
        >
          <IoLogOut size={20} color={active === 6 ? "text-pink-500" : ""} />
          <span
            className={`pl-3 ${
              active === 6 ? "text-pink-500" : ""
            } 800px:block hidden`}
          >
            Logout
          </span>
        </div>
      </div>
    </>
  );
};

export default ProfileSidebar;
