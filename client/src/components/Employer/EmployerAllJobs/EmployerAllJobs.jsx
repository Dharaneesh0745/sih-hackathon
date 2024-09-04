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

const EmployerAllJobs = () => {
  const { employer } = useSelector((state) => state.employer);
  const [isLoading, setIsLoading] = useState(true);
  const [jobs, setJobs] = useState([]);

  const deleteJob = async (id) => {
    // console.log(id);
    try {
      const res = await axios.delete(`${server}/job/deleteJob/${id}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        setJobs(jobs.filter((job) => job._id !== id));
        toast.success("Job Deleted Successfully!");
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
          `${server}/job/getAllJobs/${employer._id}`
        );
        if (response.data.success) {
          setJobs(response.data.jobs);
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
    { field: "id", headerName: "Job Id", minWidth: 150, flex: 0.7 },
    { field: "title", headerName: "Title", minWidth: 150, flex: 1 },
    { field: "location", headerName: "Location", minWidth: 150, flex: 1 },
    { field: "createdAt", headerName: "Posted On", minWidth: 150, flex: 1 },
    { field: "deadline", headerName: "Deadline", minWidth: 150 },
    {
      field: "Preview",
      flex: 0.8,
      minWidth: 100,
      headerName: "Preview",
      sortable: false,
      renderCell: (params) => {
        const job_title = params.row.title.replace(/\s+/g, "-");
        return (
          <Link to={`/job/${job_title}`}>
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
        title: item.title,
        location: item.location,
        createdAt: item.createdAt,
        deadline: item.deadline,
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

export default EmployerAllJobs;
