import React, { useEffect, useState } from "react";
// import { backend_API_endpoint } from "../../server";
import { useSelector } from "react-redux";
import { AiOutlineCamera } from "react-icons/ai";
import styles from "../../styles/styles";
// import { DataGrid } from "@material-ui/data-grid";
import { backend_API_endpoint, server } from "../../server";
import axios from "axios";
import { toast } from "react-toastify";

const ProfileContent = ({ active }) => {
  const { user } = useSelector((state) => state.user);
  const id = user._id;
  const [firstName, setFirstName] = useState(user && user.firstName);
  const [lastName, setLastName] = useState(user && user.lastName);
  const [email, setEmail] = useState(user && user.email);
  const [recoveryEmail, setRecoveryEmail] = useState(
    user && user.recoveryEmail
  );
  const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
  const [dateOfBirth, setDateOfBirth] = useState(user && user.dateOfBirth);
  const [gender, setGender] = useState(user && user.gender);
  const [country, setCountry] = useState(user && user.country);
  const [city, setCity] = useState(user && user.city);
  const [state, setState] = useState(user && user.state);
  const [address1, setAddress1] = useState(user && user.address1);
  const [address2, setAddress2] = useState(user && user.address2);
  const [zipCode, setZipCode] = useState(user && user.zipCode);
  const [addressType, setAddressType] = useState(user && user.addressType);

  const primaryDetailsSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(
        `${server}/user/update-primary-details/${id}`,
        {
          firstName,
          lastName,
          email,
          recoveryEmail,
          phoneNumber,
          dateOfBirth,
          gender,
          country,
          city,
          state,
          address1,
          address2,
          zipCode,
          addressType,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Primary Details Updated Successfully!");
      })
      .catch((err) => {
        toast.error(err.response.data.messages);
      });
  };

  const TECHNICAL_ROLES = [
    "Software Developer",
    "System Administrator",
    "Network Engineer",
    "DevOps Engineer",
    "Data Scientist",
    "Security Analyst",
    "Database Administrator",
    "IT Support Specialist",
  ];
  const NON_TECHNICAL_ROLES = ["abcdefghijklmnopqrstuvwxyz"];

  const [inputValueTechnical, setInputValueTechnical] = useState("");
  const [inputValueNonTechnical, setInputValueNonTechnical] = useState("");
  const [technicalSkills, setTechnicalSkills] = useState([]);
  const [nonTechnicalSkills, setNonTechnicalSkills] = useState([]);
  const [filteredTechnicalRoles, setFilteredTechnicalRoles] = useState([]);
  const [filteredNonTechnicalRoles, setFilteredNonTechnicalRoles] = useState(
    []
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [skillToDelete, setSkillToDelete] = useState(null);

  useEffect(() => {
    if (user) {
      setTechnicalSkills(user.technicalSkills.split(", "));
      setNonTechnicalSkills(user.nonTechnicalSkills.split(", "));
    }
  }, [user]);

  const handleInputChange = (e, type) => {
    const value = e.target.value;
    if (type === "technical") {
      setInputValueTechnical(value);
      setFilteredTechnicalRoles(
        TECHNICAL_ROLES.filter((role) =>
          role.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setInputValueNonTechnical(value);
      setFilteredNonTechnicalRoles(
        NON_TECHNICAL_ROLES.filter((role) =>
          role.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  };

  const handleRoleSelect = (role, type) => {
    if (type === "technical" && !technicalSkills.includes(role)) {
      setTechnicalSkills([...technicalSkills, role]);
    } else if (type === "nonTechnical" && !nonTechnicalSkills.includes(role)) {
      setNonTechnicalSkills([...nonTechnicalSkills, role]);
    }
    if (type === "technical") {
      setInputValueTechnical("");
      setFilteredTechnicalRoles([]);
    } else {
      setInputValueNonTechnical("");
      setFilteredNonTechnicalRoles([]);
    }
  };

  const openDeleteModal = (role, technical) => {
    setSkillToDelete({ role, technical });
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSkillToDelete(null);
  };

  const handleDeleteSkill = async () => {
    const { role, technical } = skillToDelete;
    if (technical) {
      const updatedSkills = technicalSkills.filter((r) => r !== role);
      setTechnicalSkills(updatedSkills);
    } else {
      const updatedSkills = nonTechnicalSkills.filter((r) => r !== role);
      setNonTechnicalSkills(updatedSkills);
    }
    closeDeleteModal();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedTechnicalSkills = technicalSkills.join(", ");
    const updatedNonTechnicalSkills = nonTechnicalSkills.join(", ");

    try {
      await axios.post(`${server}/user/update-skills/${id}`, {
        technicalSkills: updatedTechnicalSkills,
        nonTechnicalSkills: updatedNonTechnicalSkills,
      });
      toast.success("Skills updated successfully!");
    } catch (error) {
      toast.error("Error updating skills:", error);
    }
  };

  return (
    <>
      <div className="w-full">
        {/* profile page */}
        {active === 1 && (
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

            {/* User Primary Details */}
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
                      className={`${styles.input}!w-[95%] rounded-lg cursor-not-allowed`}
                      required
                      disabled
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
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full 800px:flex pl-9 block pb-3">
                  <div className=" w-[100%] 800px:w-[50%] mr-10">
                    <label className="block pb-2">Gender</label>
                    {/* <input
                      type="text"
                      className={`${styles.input}!w-[95%] rounded-lg`}
                      required
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    /> */}
                    <select
                      className="!w-full py-[5px] rounded-lg"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <option disabled>-- Select Gender --</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Not to say">Not to say</option>
                    </select>
                  </div>
                  <div className=" w-[100%] 800px:w-[50%]">
                    <label className="block pb-2">Country</label>
                    <input
                      type="text"
                      className={`${styles.input}!w-[95%] rounded-lg`}
                      required
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full 800px:flex pl-9 block pb-3">
                  <div className=" w-[100%] 800px:w-[50%] mr-10">
                    <label className="block pb-2">City</label>
                    <input
                      type="text"
                      className={`${styles.input}!w-[95%] rounded-lg`}
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                  <div className=" w-[100%] 800px:w-[50%]">
                    <label className="block pb-2">State</label>
                    <input
                      type="text"
                      className={`${styles.input}!w-[95%] rounded-lg`}
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
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
                      value={address1}
                      onChange={(e) => setAddress1(e.target.value)}
                    />
                  </div>
                  <div className=" w-[100%] 800px:w-[50%]">
                    <label className="block pb-2">Address-2</label>
                    <input
                      type="text"
                      className={`${styles.input}!w-[95%] rounded-lg`}
                      required
                      value={address2}
                      onChange={(e) => setAddress2(e.target.value)}
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
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                    />
                  </div>
                  <div className=" w-[100%] 800px:w-[50%]">
                    <label className="block pb-2">Address Type</label>
                    {/* <input
                      type="text"
                      className={`${styles.input}!w-[95%] rounded-lg`}
                      required
                      value={addressType}
                      onChange={(e) => setAddressType(e.target.value)}
                    /> */}
                    <select
                      className="!w-full py-[5px] rounded-lg"
                      value={addressType}
                      onChange={(e) => setAddressType(e.target.value)}
                    >
                      <option disabled> -- Select Address Type --</option>
                      <option value="Home">Home</option>
                      <option value="Office">Office</option>
                    </select>
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

            {/* Skills */}
            {/* <div className="w-full pr-8 bg-slate-300 mr-5 py-8 rounded-xl mx-8">
              <h1 className="mb-4 text-center mx-auto ml-7 text-black font-bold text-[30px]">
                Skills Details
              </h1>

              <form
                onSubmit={handleSubmit}
                className="800px:w-[1000px] mx-auto"
              >
                <div className="flex flex-wrap text-center ml-5 mb-2">
                  <h2 className="w-full text-center font-bold">
                    Primary Skills:
                  </h2>
                  {primarySkills.map((role) => (
                    <span
                      key={role}
                      className="flex items-center bg-gray-200 rounded-md p-2 mr-2 mb-2"
                    >
                      {role}
                      <button
                        type="button"
                        onClick={() => openDeleteModal(role, true)}
                        className="ml-2 bg-transparent border-none cursor-pointer"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>

                <input
                  type="text"
                  value={inputValuePrimary}
                  onChange={(e) => handleInputChange(e, "primary")}
                  placeholder="Add primary skills..."
                  className="border ml-5 rounded-md p-2 w-full mx-auto mt-4"
                />

                {filteredPrimaryRoles.length > 0 && (
                  <ul className="list-none ml-3 p-0 mt-2 border mx-auto rounded-md max-h-36 overflow-y-auto absolute z-10 bg-white w-72 800px:w-[1000px]">
                    {filteredPrimaryRoles.map((role) => (
                      <li
                        key={role}
                        onClick={() => handleRoleSelect(role, "primary")}
                        className="p-2 cursor-pointer hover:bg-gray-200"
                      >
                        {role}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="flex flex-wrap text-center ml-5 mb-2 mt-6">
                  <h2 className="w-full text-center font-bold">
                    Secondary Skills:
                  </h2>
                  {secondarySkills.map((role) => (
                    <span
                      key={role}
                      className="flex items-center bg-gray-200 rounded-md p-2 mr-2 mb-2"
                    >
                      {role}
                      <button
                        type="button"
                        onClick={() => openDeleteModal(role, false)}
                        className="ml-2 bg-transparent border-none cursor-pointer"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>

                <input
                  type="text"
                  value={inputValueSecondary}
                  onChange={(e) => handleInputChange(e, "secondary")}
                  placeholder="Add secondary skills.."
                  className="border ml-5 rounded-md p-2 w-full mx-auto mt-4"
                />

                {filteredSecondaryRoles.length > 0 && (
                  <ul className="list-none ml-3 p-0 mt-2 border mx-auto rounded-md max-h-36 overflow-y-auto absolute z-10 bg-white w-72 800px:w-[1000px]">
                    {filteredSecondaryRoles.map((role) => (
                      <li
                        key={role}
                        onClick={() => handleRoleSelect(role, "secondary")}
                        className="p-2 cursor-pointer hover:bg-gray-200"
                      >
                        {role}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="text-center mt-8">
                  <input
                    type="submit"
                    className={`w-[200px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-lg cursor-pointer`}
                    value="Update Skills"
                    required
                  />
                </div>
              </form>

              {isDeleteModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-lg font-semibold mb-4">
                      Are you sure you want to delete this skill?
                    </h2>
                    <div className="flex justify-between">
                      <button
                        onClick={closeDeleteModal}
                        className="bg-gray-300 px-4 py-2 rounded-md mr-2"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleDeleteSkill}
                        className="bg-red-500 text-white px-4 py-2 rounded-md"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div> */}

            <div className="w-full pr-8 bg-slate-300 mr-5 py-8 rounded-xl mx-8">
              <h1 className="mb-4 text-center mx-auto ml-7 text-black font-bold text-[30px]">
                Skills Details
              </h1>

              <form
                onSubmit={handleSubmit}
                className="800px:w-[1000px] mx-auto"
              >
                <div className="flex flex-wrap text-center ml-5 mb-2">
                  <h2 className="w-full text-center font-bold">
                    Technical Skills:
                  </h2>
                  {technicalSkills.map((role) => (
                    <span
                      key={role}
                      className="flex items-center bg-gray-200 rounded-md p-2 mr-2 mb-2"
                    >
                      {role}
                      <button
                        type="button"
                        onClick={() => openDeleteModal(role, true)}
                        className="ml-2 bg-transparent border-none cursor-pointer"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>

                <input
                  type="text"
                  value={inputValueTechnical}
                  onChange={(e) => handleInputChange(e, "technical")}
                  placeholder="Add technical skills..."
                  className="border ml-5 rounded-md p-2 w-full mx-auto mt-4"
                />

                {filteredTechnicalRoles.length > 0 && (
                  <ul className="list-none ml-3 p-0 mt-2 border mx-auto rounded-md max-h-36 overflow-y-auto absolute z-10 bg-white w-72 800px:w-[1000px]">
                    {filteredTechnicalRoles.map((role) => (
                      <li
                        key={role}
                        onClick={() => handleRoleSelect(role, "technical")}
                        className="p-2 cursor-pointer hover:bg-gray-200"
                      >
                        {role}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="flex flex-wrap text-center ml-5 mb-2 mt-6">
                  <h2 className="w-full text-center font-bold">
                    Non-Technical Skills:
                  </h2>
                  {nonTechnicalSkills.map((role) => (
                    <span
                      key={role}
                      className="flex items-center bg-gray-200 rounded-md p-2 mr-2 mb-2"
                    >
                      {role}
                      <button
                        type="button"
                        onClick={() => openDeleteModal(role, false)}
                        className="ml-2 bg-transparent border-none cursor-pointer"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>

                <input
                  type="text"
                  value={inputValueNonTechnical}
                  onChange={(e) => handleInputChange(e, "nonTechnical")}
                  placeholder="Add non-technical skills..."
                  className="border ml-5 rounded-md p-2 w-full mx-auto mt-4"
                />

                {filteredNonTechnicalRoles.length > 0 && (
                  <ul className="list-none ml-3 p-0 mt-2 border mx-auto rounded-md max-h-36 overflow-y-auto absolute z-10 bg-white w-72 800px:w-[1000px]">
                    {filteredNonTechnicalRoles.map((role) => (
                      <li
                        key={role}
                        onClick={() => handleRoleSelect(role, "nonTechnical")}
                        className="p-2 cursor-pointer hover:bg-gray-200"
                      >
                        {role}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="text-center mt-8">
                  <input
                    type="submit"
                    className={`w-[200px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-lg cursor-pointer`}
                    value="Update Skills"
                    required
                  />
                </div>
              </form>

              {isDeleteModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-lg font-semibold mb-4">
                      Are you sure you want to delete this skill?
                    </h2>
                    <div className="flex justify-between">
                      <button
                        onClick={closeDeleteModal}
                        className="bg-gray-300 px-4 py-2 rounded-md mr-2"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleDeleteSkill}
                        className="bg-red-500 text-white px-4 py-2 rounded-md"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
          </>
        )}

        {/* applied jobs */}
        {active === 4 && (
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
