import React, { useState } from "react";
// import { backend_API_endpoint } from "../../server";
import { useSelector } from "react-redux";
import { AiOutlineCamera } from "react-icons/ai";
import styles from "../../styles/styles";
// import { DataGrid } from "@material-ui/data-grid";
import { backend_API_endpoint } from "../../server";

const ProfileContent = ({ active }) => {
  const { user } = useSelector((state) => state.user);
  const [firstName, setFirstName] = useState(user && user.firstName);
  const [lastName, setLastName] = useState(user && user.lastName);
  const [email, setEmail] = useState(user && user.email);
  const [recoveryEmail, setRecoveryEmail] = useState(
    user && user.recoveryEmail
  );
  const [phoneNumber, setPhoneNumber] = useState();

  const primaryDetailsSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="w-full">
        {/* profile page */}
        {active === 2 && (
          <>
            <div className="flex justify-center w-full">
              <div className="relative">
                <img
                  src={`${backend_API_endpoint}${user.avatar}`}
                  className="w-[150px] h-[150px] 800px:-mb-0 -mb-7 ml-14 rounded-full object-cover border-[3px] border-[#3ad132]"
                  alt=""
                />
                <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
                  <AiOutlineCamera />
                </div>
              </div>
            </div>
            <br />
            <br />
            <div className="w-full pr-8 bg-slate-300 mr-5 py-8 rounded-xl mx-8">
              <h1 className="mb-4 text-center mx-auto ml-7 text-black font-bold text-[30px]">
                Primary Details
              </h1>
              <form onSubmit={primaryDetailsSubmit} aria-required={true}>
                <div className="w-full 800px:flex pl-9 block pb-3">
                  <div className="w-[100%] 800px:w-[50%] mr-10">
                    <label className="block pb-2">First Name</label>
                    <input
                      type="text"
                      className={`${styles.input}!w-[95%] rounded-lg rounded-lg`}
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className=" w-[100%] 800px:w-[50%]">
                    <label className="block pb-2">Last Name</label>
                    <input
                      type="text"
                      className={`${styles.input}!w-[95%] rounded-lg rounded-lg`}
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full 800px:flex pl-9 block pb-3">
                  <div className=" w-[100%] 800px:w-[50%] mr-10">
                    <label className="block pb-2">Email Address</label>
                    <input
                      type="email"
                      className={`${styles.input}!w-[95%] rounded-lg rounded-lg`}
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className=" w-[100%] 800px:w-[50%]">
                    <label className="block pb-2">Recovery Email</label>
                    <input
                      type="email"
                      className={`${styles.input}!w-[95%] rounded-lg rounded-lg`}
                      required
                      value={recoveryEmail}
                      onChange={(e) => setRecoveryEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full 800px:flex pl-9 block pb-3">
                  <div className=" w-[100%] 800px:w-[50%] mr-10">
                    <label className="block pb-2">Phone Number</label>
                    <input
                      type="number"
                      className={`${styles.input}!w-[95%] rounded-lg rounded-lg`}
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                  <div className=" w-[100%] 800px:w-[50%]">
                    <label className="block pb-2">Date of Birth</label>
                    <input
                      type="date"
                      className={`${styles.input}!w-[95%] rounded-lg rounded-lg`}
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full 800px:flex pl-9 block pb-3">
                  <div className=" w-[100%] 800px:w-[50%] mr-10">
                    <label className="block pb-2">Gender</label>
                    <input
                      type="number"
                      className={`${styles.input}!w-[95%] rounded-lg rounded-lg`}
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                  <div className=" w-[100%] 800px:w-[50%]">
                    <label className="block pb-2">Country</label>
                    <input
                      type="text"
                      className={`${styles.input}!w-[95%] rounded-lg rounded-lg`}
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full 800px:flex pl-9 block pb-3">
                  <div className=" w-[100%] 800px:w-[50%] mr-10">
                    <label className="block pb-2">City</label>
                    <input
                      type="number"
                      className={`${styles.input}!w-[95%] rounded-lg rounded-lg`}
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                  <div className=" w-[100%] 800px:w-[50%]">
                    <label className="block pb-2">State</label>
                    <input
                      type="text"
                      className={`${styles.input}!w-[95%] rounded-lg rounded-lg`}
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full 800px:flex pl-9 block pb-3">
                  <div className=" w-[100%] 800px:w-[50%] mr-10">
                    <label className="block pb-2">Address-1</label>
                    <input
                      type="text"
                      className={`${styles.input}!w-[95%] rounded-lg rounded-lg`}
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                  <div className=" w-[100%] 800px:w-[50%]">
                    <label className="block pb-2">Address-2</label>
                    <input
                      type="text"
                      className={`${styles.input}!w-[95%] rounded-lg rounded-lg`}
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full 800px:flex pl-9 block pb-3">
                  <div className=" w-[100%] 800px:w-[50%] mr-10">
                    <label className="block pb-2">Zip Code</label>
                    <input
                      type="number"
                      className={`${styles.input}!w-[95%] rounded-lg rounded-lg`}
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                  <div className=" w-[100%] 800px:w-[50%]">
                    <label className="block pb-2">Address Type</label>
                    <input
                      type="text"
                      className={`${styles.input}!w-[95%] rounded-lg rounded-lg`}
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                </div>
                <div className="text-center">
                  <input
                    type="submit"
                    className={`w-[200px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-lg mt-8 cursor-pointer`}
                    value="Update Primary Details"
                    required
                  />
                </div>
              </form>
            </div>
            <br />
            <br />
            <div className="w-full pr-8 bg-slate-300 mr-5 py-8 rounded-xl mx-8">
              <h1 className="mb-4 text-center mx-auto ml-7 text-black font-bold text-[30px]">
                Primary Details
              </h1>
              <form onSubmit={primaryDetailsSubmit} aria-required={true}>
                <div className="w-full 800px:flex pl-9 block pb-3">
                  <div className="w-[100%] 800px:w-[50%] mr-10">
                    <label className="block pb-2">First Name</label>
                    <input
                      type="text"
                      className={`${styles.input}!w-[95%] rounded-lg rounded-lg`}
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className=" w-[100%] 800px:w-[50%]">
                    <label className="block pb-2">Last Name</label>
                    <input
                      type="text"
                      className={`${styles.input}!w-[95%] rounded-lg rounded-lg`}
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full 800px:flex pl-9 block pb-3">
                  <div className=" w-[100%] 800px:w-[50%] mr-10">
                    <label className="block pb-2">Email Address</label>
                    <input
                      type="email"
                      className={`${styles.input}!w-[95%] rounded-lg rounded-lg`}
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className=" w-[100%] 800px:w-[50%]">
                    <label className="block pb-2">Recovery Email</label>
                    <input
                      type="email"
                      className={`${styles.input}!w-[95%] rounded-lg rounded-lg`}
                      required
                      value={recoveryEmail}
                      onChange={(e) => setRecoveryEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full 800px:flex pl-9 block pb-3">
                  <div className=" w-[100%] 800px:w-[50%] mr-10">
                    <label className="block pb-2">Phone Number</label>
                    <input
                      type="number"
                      className={`${styles.input}!w-[95%] rounded-lg rounded-lg`}
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                  <div className=" w-[100%] 800px:w-[50%]">
                    <label className="block pb-2">Date of Birth</label>
                    <input
                      type="date"
                      className={`${styles.input}!w-[95%] rounded-lg rounded-lg`}
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full 800px:flex pl-9 block pb-3">
                  <div className=" w-[100%] 800px:w-[50%] mr-10">
                    <label className="block pb-2">Gender</label>
                    <input
                      type="number"
                      className={`${styles.input}!w-[95%] rounded-lg rounded-lg`}
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                  <div className=" w-[100%] 800px:w-[50%]">
                    <label className="block pb-2">Country</label>
                    <input
                      type="text"
                      className={`${styles.input}!w-[95%] rounded-lg rounded-lg`}
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full 800px:flex pl-9 block pb-3">
                  <div className=" w-[100%] 800px:w-[50%] mr-10">
                    <label className="block pb-2">City</label>
                    <input
                      type="number"
                      className={`${styles.input}!w-[95%] rounded-lg rounded-lg`}
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                  <div className=" w-[100%] 800px:w-[50%]">
                    <label className="block pb-2">State</label>
                    <input
                      type="text"
                      className={`${styles.input}!w-[95%] rounded-lg rounded-lg`}
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full 800px:flex pl-9 block pb-3">
                  <div className=" w-[100%] 800px:w-[50%] mr-10">
                    <label className="block pb-2">Address-1</label>
                    <input
                      type="text"
                      className={`${styles.input}!w-[95%] rounded-lg rounded-lg`}
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                  <div className=" w-[100%] 800px:w-[50%]">
                    <label className="block pb-2">Address-2</label>
                    <input
                      type="text"
                      className={`${styles.input}!w-[95%] rounded-lg rounded-lg`}
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full 800px:flex pl-9 block pb-3">
                  <div className=" w-[100%] 800px:w-[50%] mr-10">
                    <label className="block pb-2">Zip Code</label>
                    <input
                      type="number"
                      className={`${styles.input}!w-[95%] rounded-lg rounded-lg`}
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                  <div className=" w-[100%] 800px:w-[50%]">
                    <label className="block pb-2">Address Type</label>
                    <input
                      type="text"
                      className={`${styles.input}!w-[95%] rounded-lg rounded-lg`}
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                </div>
                <div className="text-center">
                  <input
                    type="submit"
                    className={`w-[200px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-lg mt-8 cursor-pointer`}
                    value="Update Primary Details"
                    required
                  />
                </div>
              </form>
            </div>
          </>
        )}

        {/* applied page

        experience
        {active === 2 && (
          <>
            <div className="w-full pr-8 mt-5 bg-slate-300 mr-5 py-8 rounded-xl mx-8">
              <h1 className="mb-4 text-center text-black font-bold text-[30px]">
                Experience
              </h1>
              <form onSubmit={primaryDetailsSubmit} aria-required={true}>
                <div className="w-full 800px:flex pl-9 block pb-3">
                  <div className=" w-[100%] 800px:w-[50%] mr-10">
                    <label className="block pb-2">First Name</label>
                    <input
                      type="text"
                      className={`${styles.input}!w-[95%] rounded-lg`}
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className=" w-[100%] 800px:w-[50%]">
                    <label className="block pb-2">Last Name</label>
                    <input
                      type="text"
                      className={`${styles.input}!w-[95%] rounded-lg`}
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full 800px:flex pl-9 block pb-3">
                  <div className=" w-[100%] 800px:w-[50%] mr-10">
                    <label className="block pb-2">Email Address</label>
                    <input
                      type="email"
                      className={`${styles.input}!w-[95%] rounded-lg`}
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className=" w-[100%] 800px:w-[50%]">
                    <label className="block pb-2">Recovery Email</label>
                    <input
                      type="email"
                      className={`${styles.input}!w-[95%] rounded-lg`}
                      required
                      value={recoveryEmail}
                      onChange={(e) => setRecoveryEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full 800px:flex pl-9 block pb-3">
                  <div className=" w-[100%] 800px:w-[50%] mr-10">
                    <label className="block pb-2">Phone Number</label>
                    <input
                      type="number"
                      className={`${styles.input}!w-[95%] rounded-lg`}
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                  <div className=" w-[100%] 800px:w-[50%]">
                    <label className="block pb-2">Date of Birth</label>
                    <input
                      type="date"
                      className={`${styles.input}!w-[95%] rounded-lg`}
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full 800px:flex pl-9 block pb-3">
                  <div className=" w-[100%] 800px:w-[50%] mr-10">
                    <label className="block pb-2">Gender</label>
                    <input
                      type="number"
                      className={`${styles.input}!w-[95%] rounded-lg`}
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                  <div className=" w-[100%] 800px:w-[50%]">
                    <label className="block pb-2">Country</label>
                    <input
                      type="text"
                      className={`${styles.input}!w-[95%] rounded-lg`}
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full 800px:flex pl-9 block pb-3">
                  <div className=" w-[100%] 800px:w-[50%] mr-10">
                    <label className="block pb-2">City</label>
                    <input
                      type="number"
                      className={`${styles.input}!w-[95%] rounded-lg`}
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                  <div className=" w-[100%] 800px:w-[50%]">
                    <label className="block pb-2">State</label>
                    <input
                      type="text"
                      className={`${styles.input}!w-[95%] rounded-lg`}
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full 800px:flex pl-9 block pb-3">
                  <div className=" w-[100%] 800px:w-[50%] mr-10">
                    <label className="block pb-2">Address-1</label>
                    <input
                      type="text"
                      className={`${styles.input}!w-[95%] rounded-lg`}
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                  <div className=" w-[100%] 800px:w-[50%]">
                    <label className="block pb-2">Address-2</label>
                    <input
                      type="text"
                      className={`${styles.input}!w-[95%] rounded-lg`}
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full 800px:flex pl-9 block pb-3">
                  <div className=" w-[100%] 800px:w-[50%] mr-10">
                    <label className="block pb-2">Zip Code</label>
                    <input
                      type="number"
                      className={`${styles.input}!w-[95%] rounded-lg`}
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                  <div className=" w-[100%] 800px:w-[50%]">
                    <label className="block pb-2">Address Type</label>
                    <input
                      type="text"
                      className={`${styles.input}!w-[95%] rounded-lg`}
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                </div>
                <div className="text-center">
                  <input
                    type="submit"
                    className={`w-[200px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-lg mt-8 cursor-pointer`}
                    value="Update Primary Details"
                    required
                  />
                </div>
              </form>
            </div>
          </>
        )}

        achievements
        {active === 3 && (
          <>
            <div className="w-full pr-8 mt-5 bg-slate-300 mr-5 py-8 rounded-xl mx-8">
              <h1 className="mb-4 text-center text-black font-bold text-[30px]">
                Achievements
              </h1>
              <form onSubmit={primaryDetailsSubmit} aria-required={true}>
                <div className="w-full 800px:flex pl-9 block pb-3">
                  <div className=" w-[100%] 800px:w-[50%] mr-10">
                    <label className="block pb-2">First Name</label>
                    <input
                      type="text"
                      className={`${styles.input}!w-[95%] rounded-lg`}
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className=" w-[100%] 800px:w-[50%]">
                    <label className="block pb-2">Last Name</label>
                    <input
                      type="text"
                      className={`${styles.input}!w-[95%] rounded-lg`}
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full 800px:flex pl-9 block pb-3">
                  <div className=" w-[100%] 800px:w-[50%] mr-10">
                    <label className="block pb-2">Email Address</label>
                    <input
                      type="email"
                      className={`${styles.input}!w-[95%] rounded-lg`}
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className=" w-[100%] 800px:w-[50%]">
                    <label className="block pb-2">Recovery Email</label>
                    <input
                      type="email"
                      className={`${styles.input}!w-[95%] rounded-lg`}
                      required
                      value={recoveryEmail}
                      onChange={(e) => setRecoveryEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full 800px:flex pl-9 block pb-3">
                  <div className=" w-[100%] 800px:w-[50%] mr-10">
                    <label className="block pb-2">Phone Number</label>
                    <input
                      type="number"
                      className={`${styles.input}!w-[95%] rounded-lg`}
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                  <div className=" w-[100%] 800px:w-[50%]">
                    <label className="block pb-2">Date of Birth</label>
                    <input
                      type="date"
                      className={`${styles.input}!w-[95%] rounded-lg`}
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full 800px:flex pl-9 block pb-3">
                  <div className=" w-[100%] 800px:w-[50%] mr-10">
                    <label className="block pb-2">Gender</label>
                    <input
                      type="number"
                      className={`${styles.input}!w-[95%] rounded-lg`}
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                  <div className=" w-[100%] 800px:w-[50%]">
                    <label className="block pb-2">Country</label>
                    <input
                      type="text"
                      className={`${styles.input}!w-[95%] rounded-lg`}
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full 800px:flex pl-9 block pb-3">
                  <div className=" w-[100%] 800px:w-[50%] mr-10">
                    <label className="block pb-2">City</label>
                    <input
                      type="number"
                      className={`${styles.input}!w-[95%] rounded-lg`}
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                  <div className=" w-[100%] 800px:w-[50%]">
                    <label className="block pb-2">State</label>
                    <input
                      type="text"
                      className={`${styles.input}!w-[95%] rounded-lg`}
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full 800px:flex pl-9 block pb-3">
                  <div className=" w-[100%] 800px:w-[50%] mr-10">
                    <label className="block pb-2">Address-1</label>
                    <input
                      type="text"
                      className={`${styles.input}!w-[95%] rounded-lg`}
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                  <div className=" w-[100%] 800px:w-[50%]">
                    <label className="block pb-2">Address-2</label>
                    <input
                      type="text"
                      className={`${styles.input}!w-[95%] rounded-lg`}
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full 800px:flex pl-9 block pb-3">
                  <div className=" w-[100%] 800px:w-[50%] mr-10">
                    <label className="block pb-2">Zip Code</label>
                    <input
                      type="number"
                      className={`${styles.input}!w-[95%] rounded-lg`}
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                  <div className=" w-[100%] 800px:w-[50%]">
                    <label className="block pb-2">Address Type</label>
                    <input
                      type="text"
                      className={`${styles.input}!w-[95%] rounded-lg`}
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                </div>
                <div className="text-center">
                  <input
                    type="submit"
                    className={`w-[200px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-lg mt-8 cursor-pointer`}
                    value="Update Primary Details"
                    required
                  />
                </div>
              </form>
            </div>
          </>
        )}

        education
        {active === 4 && (
          <>
            <div className="w-full pr-8 mt-5 bg-slate-300 mr-5 py-8 rounded-xl mx-8">
              <h1 className="mb-4 text-center text-black font-bold text-[30px]">
                Education
              </h1>
              <form onSubmit={primaryDetailsSubmit} aria-required={true}>
                <div className="w-full 800px:flex pl-9 block pb-3">
                  <div className=" w-[100%] 800px:w-[50%] mr-10">
                    <label className="block pb-2">First Name</label>
                    <input
                      type="text"
                      className={`${styles.input}!w-[95%] rounded-lg`}
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className=" w-[100%] 800px:w-[50%]">
                    <label className="block pb-2">Last Name</label>
                    <input
                      type="text"
                      className={`${styles.input}!w-[95%] rounded-lg`}
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full 800px:flex pl-9 block pb-3">
                  <div className=" w-[100%] 800px:w-[50%] mr-10">
                    <label className="block pb-2">Email Address</label>
                    <input
                      type="email"
                      className={`${styles.input}!w-[95%] rounded-lg`}
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className=" w-[100%] 800px:w-[50%]">
                    <label className="block pb-2">Recovery Email</label>
                    <input
                      type="email"
                      className={`${styles.input}!w-[95%] rounded-lg`}
                      required
                      value={recoveryEmail}
                      onChange={(e) => setRecoveryEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full 800px:flex pl-9 block pb-3">
                  <div className=" w-[100%] 800px:w-[50%] mr-10">
                    <label className="block pb-2">Phone Number</label>
                    <input
                      type="number"
                      className={`${styles.input}!w-[95%] rounded-lg`}
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                  <div className=" w-[100%] 800px:w-[50%]">
                    <label className="block pb-2">Date of Birth</label>
                    <input
                      type="date"
                      className={`${styles.input}!w-[95%] rounded-lg`}
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full 800px:flex pl-9 block pb-3">
                  <div className=" w-[100%] 800px:w-[50%] mr-10">
                    <label className="block pb-2">Gender</label>
                    <input
                      type="number"
                      className={`${styles.input}!w-[95%] rounded-lg`}
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                  <div className=" w-[100%] 800px:w-[50%]">
                    <label className="block pb-2">Country</label>
                    <input
                      type="text"
                      className={`${styles.input}!w-[95%] rounded-lg`}
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full 800px:flex pl-9 block pb-3">
                  <div className=" w-[100%] 800px:w-[50%] mr-10">
                    <label className="block pb-2">City</label>
                    <input
                      type="number"
                      className={`${styles.input}!w-[95%] rounded-lg`}
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                  <div className=" w-[100%] 800px:w-[50%]">
                    <label className="block pb-2">State</label>
                    <input
                      type="text"
                      className={`${styles.input}!w-[95%] rounded-lg`}
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full 800px:flex pl-9 block pb-3">
                  <div className=" w-[100%] 800px:w-[50%] mr-10">
                    <label className="block pb-2">Address-1</label>
                    <input
                      type="text"
                      className={`${styles.input}!w-[95%] rounded-lg`}
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                  <div className=" w-[100%] 800px:w-[50%]">
                    <label className="block pb-2">Address-2</label>
                    <input
                      type="text"
                      className={`${styles.input}!w-[95%] rounded-lg`}
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full 800px:flex pl-9 block pb-3">
                  <div className=" w-[100%] 800px:w-[50%] mr-10">
                    <label className="block pb-2">Zip Code</label>
                    <input
                      type="number"
                      className={`${styles.input}!w-[95%] rounded-lg`}
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                  <div className=" w-[100%] 800px:w-[50%]">
                    <label className="block pb-2">Address Type</label>
                    <input
                      type="text"
                      className={`${styles.input}!w-[95%] rounded-lg`}
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                </div>
                <div className="text-center">
                  <input
                    type="submit"
                    className={`w-[200px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-lg mt-8 cursor-pointer`}
                    value="Update Primary Details"
                    required
                  />
                </div>
              </form>
            </div>
          </>
        )} */}

        {/* applied jobs */}
        {active === 7 && (
          <div>
            <AppliedJobs />
          </div>
        )}
      </div>
    </>
  );
};

const AppliedJobs = () => {
  const applied = [
    {
      _id: "7463hvbfbhfbrtr28820221",
      totalApplied: [
        {
          title: "Full-Stack Developer",
        },
      ],
      appliedDate: "07-04-2005",
      applicationStatus: "Interview",
    },
  ];

  const columns = [
    {
      field: "id",
      headerName: "Application ID",
      minWidth: 150,
      flex: 0.7,
    },

    {
      field: "title",
      headerName: "Job Title",
      minWidth: 150,
      flex: 0.7,
    },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassNamme: (params) => {
        return params.getValue(params.id, "status") === "Applied"
          ? "text-blue-500"
          : params.getValue(params.id, "status") === "Interview"
          ? "text-yellow-500"
          : "text-green-500";
      },
    },

    {
      field: "date",
      headerName: "Applied Date",
      minWidth: 150,
      flex: 0.7,
    },

    {
      field: "action",
      headerName: "Action",
      minWidth: 150,
      flex: 0.7,
      renderCell: (params) => {
        return (
          <div>
            <button className="text-blue-500">View</button>
          </div>
        );
      },
    },
  ];

  const row = [];

  applied &&
    applied.forEach((item) => {
      row.push({
        id: item._id,
        title: item.totalApplied[0].title,
        status: item.applicationStatus,
        date: item.appliedDate,
      });
    });

  return (
    <div className="pl-9 pt-1">
      {/* <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      /> */}
    </div>
  );
};

export default ProfileContent;
