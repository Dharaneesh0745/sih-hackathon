import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import Loader from "../../Layouts/Loader";
import axios from "axios";
import { server } from "../../../server";
import { toast } from "react-toastify";
import styles from "../../../styles/styles";
import { IoCloseSharp } from "react-icons/io5";

const EmployerAllCoupouns = () => {
  const [open, setOpen] = useState(false);
  const { employer } = useSelector((state) => state.employer);
  const [isLoading, setIsLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  //   const { events } = useSelector((state) => state.events);
  const [name, setName] = useState("");
  const [value, setValue] = useState(null);
  const [minAmount, setMinAmount] = useState(null);
  const [maxAmount, setMaxAmount] = useState(null);
  const [allEvents, setAllEvents] = useState([]);
  const [discountEvent, setDiscountEvent] = useState("");
  const [coupouns, setCoupouns] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${server}/coupoun/get-coupon/${employer._id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setIsLoading(false);
        setCoupouns(res.data.couponCodes);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  }, []);

  const getAllEvents = async () => {
    try {
      const response = await axios.get(
        `${server}/event/getAllEvents/${employer._id}`
      );
      const events = response.data.events;
      setAllEvents(events);
      console.log("Fetched events:", events);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    getAllEvents();
  }, []);

  const deleteCoupoun = async (id) => {
    // console.log(id);
    try {
      const res = await axios.delete(`${server}/coupoun/delete-coupon/${id}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        // setJobs(jobs.filter((job) => job._id !== id));
        toast.success("Coupon Deleted Successfully!");
        window.location.reload(true);
      }
    } catch (error) {
      toast.error("Error deleting coupon:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // toast.success("Coupoun Added Successfully");

    const data = {
      name,
      value,
      minAmount,
      maxAmount,
      companyId: employer._id,
      employer: employer,
      selectedEvent: discountEvent,
    };

    await axios
      .post(`${server}/coupoun/create-coupon-code`, data, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success("Coupoun Created Successfully!");
        setOpen(false);
        window.location.reload(true);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          `${server}/event/getAllEvents/${employer._id}`
        );
        // console.log(response);
        if (response.data.success) {
          setJobs(response.data.events);
        } else {
          setJobs([]);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const columns = [
    { field: "id", headerName: "Event Id", minWidth: 150, flex: 0.7 },
    { field: "name", headerName: "Name", minWidth: 150, flex: 1 },
    { field: "percentage", headerName: "Percentage", minWidth: 150, flex: 1 },
    {
      field: "Delete",
      flex: 0.8,
      minWidth: 120,
      headerName: "Delete",
      sortable: false,
      renderCell: (params) => {
        return (
          <Button onClick={() => deleteCoupoun(params.id)}>
            <AiOutlineDelete size={20} />
          </Button>
        );
      },
    },
  ];

  // Ensure jobs is an array before mapping
  console.log(coupouns);
  const rows = Array.isArray(coupouns)
    ? coupouns.map((item) => ({
        id: item._id,
        name: item.name,
        percentage: item.value + "%",
        // createdAt: item.createdAt,
        // deadline: item.deadline,
      }))
    : [];

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white">
          <div className="w-full flex justify-end">
            <div
              className={`${styles.button} mr-5`}
              onClick={() => setOpen(true)}
            >
              <span className="text-white">Create Coupoun</span>
            </div>
          </div>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
          {open && (
            <div className="fixed top-0 left-0 w-full h-screen bg-[#00000062] z-[2000] flex items-center justify-center overflow-y-scroll">
              <div
                className="w-[90%] 800px:w-[40%]
             h-[80vh] bg-white rounded-md shadow p-3"
              >
                <div className="w-full flex justify-end">
                  <IoCloseSharp
                    size={30}
                    onClick={() => setOpen(false)}
                    className="cursor-pointer"
                  />
                </div>
                <h5 className="text-[30px] font-Poppins text-center">
                  Create Coupoun Code
                </h5>
                {/* create coupoun code */}
                <form onSubmit={handleSubmit}>
                  <br />
                  <div>
                    <label className="pb-2">
                      Coupoun Code Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm"
                      placeholder="Enter Coupoun Code Name..."
                      required
                    />
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">
                      Discount Percentage{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="title"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm"
                      placeholder="Enter Coupoun Code Percentage..."
                      required
                    />
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">
                      Minimum Amount <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="title"
                      value={minAmount}
                      onChange={(e) => setMinAmount(e.target.value)}
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm"
                      placeholder="Enter Minimum Amount..."
                      required
                    />
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">Maximum Amount</label>
                    <input
                      type="number"
                      name="title"
                      value={maxAmount}
                      onChange={(e) => setMaxAmount(e.target.value)}
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm"
                      placeholder="Enter Maximum Amount..."
                    />
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">
                      Select Event <span className="text-red-500">*</span>
                    </label>
                    <select
                      className="w-full mt-2 border h-[35px] rounded-md"
                      value={discountEvent}
                      onChange={(e) => setDiscountEvent(e.target.value)}
                      required
                    >
                      <option value="">-- Select Event --</option>
                      {allEvents &&
                        allEvents.map((i) => (
                          <option key={i.name} value={i.name}>
                            {i.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <br />
                  <div>
                    <input
                      type="submit"
                      value="Create"
                      className="mt-2 cursor-pointer appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default EmployerAllCoupouns;
