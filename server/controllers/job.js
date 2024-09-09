const express = require("express");
const router = express.Router();
const Job = require("../models/job");
const { upload } = require("../multer");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const Employer = require("../models/employer");
const { isEmployerAuthenticated } = require("../middlewares/auth");

// create job
router.post(
  "/create-job",
  upload.array("images"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const companyId = req.body.companyId;
      console.log("Received companyId:", companyId);

      const company = await Employer.findById(companyId);
      console.log("Company found:", company);

      if (!company) {
        console.log("Company not found");
        return next(new ErrorHandler("Company not found", 404));
      }

      const files = req.files;
      const imageUrls = files.map((file) => file.filename); // Correct key used here
      const jobData = req.body;
      jobData.images = imageUrls.length > 0 ? imageUrls : [];
      jobData.employer = company;

      console.log("Creating job with data:", jobData);

      const job = await Job.create(jobData);
      console.log("Job created successfully:", job);

      res.status(201).json({
        success: true,
        job,
      });
      console.log("Response sent successfully");
    } catch (error) {
      console.error("Error in job creation:", error.message);
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// get all jobs
router.get(
  "/get-all-jobs",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const jobs = await Job.find().sort({ createdAt: -1 });

      res.status(201).json({
        success: true,
        jobs,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// Get a job by ID
router.get(
  "/get-job/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { id } = req.params;

      // Find job by ID
      const job = await Job.findById(id).populate("employer"); // Populates the employer field with the employer's details

      if (!job) {
        return next(new ErrorHandler("Job not found", 404));
      }

      res.status(200).json({
        success: true,
        job,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// get all jobs of a shop
router.get(
  "/getAllJobs/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const jobs = await Job.find({ companyId: req.params.id });
      res.status(200).json({
        success: true,
        jobs,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// delete job of a company
router.delete(
  "/deleteJob/:id",
  isEmployerAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const jobId = req.params.id;
      const job = await Job.findByIdAndDelete(jobId);

      if (!job) {
        return next(new ErrorHandler("Job not found", 404));
      }

      res.status(200).json({
        success: true,
        message: "Job deleted successfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
