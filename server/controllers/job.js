const express = require("express");
const router = express.Router();
const Job = require("../models/job");
const { upload } = require("../multer");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const Employer = require("../models/employer");
const { isEmployerAuthenticated } = require("../middlewares/auth");

router.post(
  "/create-job",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const {
        title,
        description,
        salary,
        location,
        category,
        experience,
        skills,
        jobType,
        locationType,
        education,
        deadline,
        vacancy,
        tags,
        companyId,
        imageUrl,
      } = req.body;

      console.log("Received companyId:", companyId, imageUrl);

      // Assuming you have an employer object to associate with the job
      const employer = await Employer.findById(companyId); // Fetch the employer using the companyId

      if (!employer) {
        return res.status(404).json({ message: "Employer not found" });
      }

      // Create a new job
      const newJob = new Job({
        title,
        description,
        salary,
        location,
        category,
        experience,
        skills,
        jobType,
        locationType,
        education,
        deadline,
        vacancy,
        tags,
        companyId,
        employer: employer, // Embedding the employer object
        image: imageUrl, // Storing the image URL
      });

      // Save the job to the database
      await newJob.save();

      res.status(201).json({ success: true, job: newJob });
    } catch (error) {
      console.error("Error creating job:", error);
      res.status(500).json({ message: "Internal server error" });
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
