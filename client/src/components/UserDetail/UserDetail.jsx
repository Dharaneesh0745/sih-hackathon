import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { backend_API_endpoint, server } from "../../server";
import styles from "../../styles/styles";
import { FaCoins } from "react-icons/fa6";
import { MdAdd } from "react-icons/md";
import { BiMessageDetail } from "react-icons/bi";
import Loader from "../Layouts/Loader";

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allData, setAllData] = useState(null);
  // console.log(id);
  useEffect(() => {
    // Function to fetch user data
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${server}/user/view-user/${id}`);
        const data = await response.json();
        setAllData(data);
        if (data.success) {
          setUser(data.view_user);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError("An error occurred while fetching the user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  console.log(user);

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div>User Not Found</div>;
  }

  return (
    <div>
      {user ? (
        <>
          <div className="800px:block hidden">
            <div className="m-5 rounded-xl bg-gray-300 h-screen">
              <div className="w-[28%] m-3 absolute overflow-y-scroll rounded-lg h-[97vh]">
                <div className="relative">
                  <img
                    src={`${user.avatar}`}
                    alt="profile"
                    className="w-40 h-40 rounded-full m-5 mx-auto items-center"
                  />
                  <span className="absolute right-[120px] bottom-0">
                    <img src="/subs.png" alt="" className="h-16 w-16" />
                  </span>
                </div>
                <div className="text-center">
                  <h1 className="text-2xl font-bold">
                    {user.firstName} {user.lastName}
                  </h1>
                  <p className="text-sm">Full-Stack Developer | ML Engineer</p>
                  <p className="text-sm">Coimbatore, India</p>
                  <div className="flex flex-row">
                    <button className={`${styles.button} text-white mx-auto`}>
                      Follow &nbsp; <MdAdd className="mt-0.5" />
                    </button>
                    <button className={`${styles.button} text-white mx-auto`}>
                      Message &nbsp; <BiMessageDetail className="mt-1" />
                    </button>
                  </div>
                  <button className={`${styles.buttonOutline} w-[80%] mx-auto`}>
                    Total points earned: &nbsp;&nbsp;{" "}
                    <FaCoins className="text-yellow-500" /> &nbsp; 1200 points
                  </button>
                </div>
                <div className="text-center mt-7 items-center mx-auto">
                  <h1 className="text-2xl font-bold">Current Shield</h1>
                  <img src="/shield.png" alt="" className="h-40 w-40 mx-auto" />
                </div>
                <div className="mt-16 relative">
                  <hr className="h-1 bg-red-700 mx-5" />
                  <div className="flex flex-row justify-between absolute gap-[73px] -top-1 mx-5">
                    <span className="bg-green-500 h-1 p-2 -top-1 -left-1 rounded-full  "></span>
                    <span className="bg-green-500 h-1 p-2 -top-1 left-0 rounded-full"></span>
                    <span className="bg-green-500 h-1 p-2 -top-1 left-0 rounded-full"></span>
                    <span className="bg-green-500 h-1 p-2 -top-1 left-0 rounded-full"></span>
                    <span className="bg-green-500 h-1 p-2 -top-1 -right-1 rounded-full  "></span>
                  </div>
                  <div className="flex flex-row  text-sm justify-between absolute gap-[55px] mx-5 top-5">
                    <span className="">1000</span>
                    <span className="">2000</span>
                    <span className="">3000</span>
                    <span className="">4000</span>
                    <span className="">5000</span>
                  </div>
                </div>
                <div className="bg-red-300 h-20 mt-16 mx-5 rounded-lg"></div>
              </div>
              <div className="w-[67%] absolute rounded-lg right-5 bg-white h-[97vh] m-3"></div>
            </div>
          </div>
        </>
      ) : (
        <div>No user found</div>
      )}
    </div>
  );
};

export default UserDetail;
