import React from "react";
import { RxPerson } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

const ProfileSidebar = ({ active, setActive }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="w-full font-bold bg-white shadow-lg rounded-xl p-4 pt-8">
        <div
          className="flex items-center cursor-pointer w-full mb-8"
          onClick={() => setActive(1)}
        >
          <RxPerson size={20} color={active === 1 ? "text-pink-500" : ""} />
          <span className={`pl-3 ${active === 1 ? "text-pink-500" : ""}`}>
            Profile
          </span>
        </div>
        <div
          className="flex items-center cursor-pointer w-full mb-8"
          onClick={() => setActive(2)}
        >
          <RxPerson size={20} color={active === 2 ? "text-pink-500" : ""} />
          <span className={`pl-3 ${active === 2 ? "text-pink-500" : ""}`}>
            Applied
          </span>
        </div>
        <div
          className="flex items-center cursor-pointer w-full mb-8"
          onClick={() => setActive(2)}
        >
          <RxPerson size={20} color={active === 2 ? "text-pink-500" : ""} />
          <span className={`pl-3 ${active === 2 ? "text-pink-500" : ""}`}>
            Applied
          </span>
        </div>
        <div
          className="flex items-center cursor-pointer w-full mb-8"
          onClick={() => setActive(3)}
        >
          <RxPerson size={20} color={active === 3 ? "text-pink-500" : ""} />
          <span className={`pl-3 ${active === 3 ? "text-pink-500" : ""}`}>
            Logout
          </span>
        </div>
      </div>
    </>
  );
};

export default ProfileSidebar;
