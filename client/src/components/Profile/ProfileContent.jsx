import React, { useState } from "react";
// import { backend_API_endpoint } from "../../server";
import { useSelector } from "react-redux";
import { AiOutlineCamera } from "react-icons/ai";
import styles from "../../styles/styles";

const ProfileContent = ({ active }) => {
  const { user } = useSelector((state) => state.user);
  const [firstName, setFirstName] = useState(user && user.firstName);
  const [lastName, setLastName] = useState(user && user.lastName);

  return (
    <>
      <div className="w-full">
        {/* profile page */}
        {active === 1 && (
          <>
            <div className="flex justify-center w-full">
              <div className="relative">
                <img
                  src={``}
                  className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]"
                  alt=""
                />
                <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
                  <AiOutlineCamera />
                </div>
              </div>
            </div>
            <br />
            <br />
            <div className="w-full px-5">
              <form>
                <div className="w-full 800px:flex block pb-3">
                  <div className=" w-[100%] 800px:w-[50%]">
                    <label className="block pb-2">First Name</label>
                    <input
                      type="text"
                      className={`${styles.input}!w-[95%]`}
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className=" w-[100%] 800px:w-[50%]">
                    <label className="block pb-2">Last Name</label>
                    <input
                      type="text"
                      className={`${styles.input}!w-[95%]`}
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ProfileContent;
