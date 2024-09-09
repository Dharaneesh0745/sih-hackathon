import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../../server";
import { toast } from "react-toastify";
import styles from "../../../styles/styles";

const EmployerSignup = () => {
  const [companyName, setCompanyName] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [employerEmail, setEmployerEmail] = useState("");
  const [employerPhone, setEmployerPhone] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const navigate = useNavigate();

  const handleFileUpload = () => {
    window.cloudinary.openUploadWidget(
      { cloudName: "dzutfi16w", uploadPreset: "bjydfkpb" },
      (error, result) => {
        if (result && result.event === "success") {
          setAvatarUrl(result.info.secure_url);
        }
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!avatarUrl) {
      alert("Please upload an avatar!");
      return;
    }

    try {
      const res = await axios.post(`${server}/employer/create-employer`, {
        companyName,
        employerName,
        employerEmail,
        employerPhone,
        password,
        avatar: avatarUrl,
      });
      toast.success(res.data.message);
      setCompanyName("");
      setEmployerName("");
      setEmployerEmail("");
      setEmployerPhone("");
      setPassword("");
      setAvatarUrl(null);
      navigate("/employer/login");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create an Employer Account
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-[35rem]">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Form Fields */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Company Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="companyName"
                  autoComplete="name"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Employer Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="employerName"
                  autoComplete="name"
                  required
                  value={employerName}
                  onChange={(e) => setEmployerName(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Employer Email address
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="employerEmail"
                  autoComplete="email"
                  required
                  value={employerEmail}
                  onChange={(e) => setEmployerEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Employer Phone Number
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="employerPhone"
                  autoComplete="email"
                  required
                  value={employerPhone}
                  onChange={(e) => setEmployerPhone(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={visible ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {visible ? (
                  <AiOutlineEye
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(true)}
                  />
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="avatar"
                className="block text-sm font-medium text-gray-700"
              >
                Avatar
              </label>
              <div className="mt-2 flex items-center">
                <span className="inline-block cursor-pointer h-8 w-8 rounded-full overflow-hidden">
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt="avatar"
                      className="h-full w-full object-cover rounded-full"
                    />
                  ) : (
                    <RxAvatar className="h-8 w-8" />
                  )}
                </span>
                <label
                  htmlFor="file-input"
                  className="ml-5 flex items-center cursor-pointer justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <span>Upload company logo</span>
                  <button
                    type="button"
                    onClick={handleFileUpload}
                    className="ml-3 bg-blue-600 text-white px-4 py-2 rounded-md"
                  >
                    Upload
                  </button>
                </label>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
            <div className={`${styles.noramlFlex} w-full`}>
              <h4>Already have an account?</h4>
              <Link to="/employer/login" className="text-blue-600 pl-2">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployerSignup;
