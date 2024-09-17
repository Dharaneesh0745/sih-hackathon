import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { server } from "../../../server"; // Ensure you have this configured
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const EmployerAllApplications = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const { employer } = useSelector((state) => state.employer);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchEmployerApplications = async () => {
      try {
        const { data } = await axios.get(
          `${server}/employer/applied-users/${employer._id}`
        );
        console.log(data);

        // Flatten the data structure
        const flattenedRows = data.jobs.flatMap((job) =>
          job.appliedUsers.map((user) => ({
            id: `${job.jobId}-${user._id}`, // Unique ID for each row
            jobId: job.jobId,
            jobTitle: job.jobTitle,
            applicantId: user._id,
            applicantName: user.name, // Assuming user object has a name property
            applicantEmail: user.email, // Assuming user object has an email property
            appliedDate: new Date(user.appliedDate).toLocaleDateString(),
            applicationStatus: user.applicationStatus,
          }))
        );

        setRows(flattenedRows);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching employer applications:", error);
        setLoading(false);
      }
    };

    fetchEmployerApplications();
  }, [employer._id]);

  const handleViewClick = (applicantId) => {
    // Navigate to the detailed view page
    navigate(`/u/${applicantId}`);
  };

  const columns = [
    {
      field: "jobId",
      headerName: "Job ID",
      minWidth: 150,
      flex: 0.7,
    },
    {
      field: "jobTitle",
      headerName: "Job Title",
      minWidth: 150,
      flex: 0.7,
    },
    {
      field: "applicantId",
      headerName: "Applicant ID",
      minWidth: 150,
      flex: 0.7,
    },
    // {
    //   field: "applicantName",
    //   headerName: "Name",
    //   minWidth: 200,
    //   flex: 1,
    // },
    // {
    //   field: "applicantEmail",
    //   headerName: "Email",
    //   minWidth: 200,
    //   flex: 1,
    // },
    {
      field: "appliedDate",
      headerName: "Applied Date",
      minWidth: 150,
      flex: 0.7,
    },
    {
      field: "applicationStatus",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.row.applicationStatus === "Applied"
          ? "text-blue-500"
          : params.row.applicationStatus === "Interview"
          ? "text-yellow-500"
          : "text-green-500";
      },
    },
    {
      field: "view",
      headerName: "Action",
      minWidth: 150,
      flex: 0.7,
      renderCell: (params) => (
        <button
          className="text-blue-500"
          onClick={() => handleViewClick(params.row.applicantId)}
        >
          View
        </button>
      ),
    },
  ];

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="pl-9 pt-1">
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

export default EmployerAllApplications;
