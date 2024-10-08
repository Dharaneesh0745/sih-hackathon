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

const EmployerAllEvents = () => {
  const { employer } = useSelector((state) => state.employer);
  const [isLoading, setIsLoading] = useState(true);
  const [jobs, setJobs] = useState([]);

  const deleteJob = async (id) => {
    // console.log(id);
    try {
      const res = await axios.delete(`${server}/event/deleteEvent/${id}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        setJobs(jobs.filter((job) => job._id !== id));
        toast.success("Event Deleted Successfully!");
        window.location.reload(true);
      }
    } catch (error) {
      toast.error("Error deleting job:", error);
    }
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          `${server}/event/getAllEvents/${employer._id}`
        );
        console.log(response);
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

  // console.log(jobs);

  const columns = [
    { field: "id", headerName: "Event Id", minWidth: 150, flex: 0.7 },
    { field: "name", headerName: "Name", minWidth: 150, flex: 1 },
    { field: "location", headerName: "Location", minWidth: 150, flex: 1 },
    { field: "createdAt", headerName: "Posted On", minWidth: 150, flex: 1 },
    {
      field: "Preview",
      flex: 0.8,
      minWidth: 100,
      headerName: "Preview",
      sortable: false,
      renderCell: (params) => {
        // console.log("params: ", params.id);
        return (
          <Link to={`/event/${params.id}`}>
            <Button>
              <AiOutlineEye size={20} />
            </Button>
          </Link>
        );
      },
    },
    {
      field: "Delete",
      flex: 0.8,
      minWidth: 120,
      headerName: "Delete",
      sortable: false,
      renderCell: (params) => {
        return (
          <Button onClick={() => deleteJob(params.id)}>
            <AiOutlineDelete size={20} />
          </Button>
        );
      },
    },
  ];

  // Ensure jobs is an array before mapping
  const rows = Array.isArray(jobs)
    ? jobs.map((item) => ({
        id: item._id,
        name: item.name,
        location: item.location,
        createdAt: item.createdAt,
        // deadline: item.deadline,
      }))
    : [];

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </div>
      )}
    </>
  );
};

export default EmployerAllEvents;
