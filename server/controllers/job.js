const express = require("express");
const router = express.Router();
const Job = require("../models/job");
const { upload } = require("../multer");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const Employer = require("../models/employer");

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

module.exports = router;
