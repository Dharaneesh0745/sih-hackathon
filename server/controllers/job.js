const express = require("express");
const router = express.Router();
const Job = require("../models/job");
const { upload } = require("../multer");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const Employer = require("../models/employer");
const { isEmployerAuthenticated } = require("../middlewares/auth");
const User = require("../models/user");

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

      const job = await Job.findById(id).populate("employer");

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

// apply jobs
router.post(
  "/applyJobs/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const job_id = req.params.id;

      const { user_id, firstName, lastName, email, phone, resume } = req.body;

      const user = await User.findById(user_id);
      const job = await Job.findById(job_id);

      console.log(user);

      if (!job) {
        return next(new ErrorHandler("Job not found!", 404));
      }
      if (!user) {
        return next(new ErrorHandler("User not found!", 404));
      }

      // if (job.appliedUsers.includes(user_id)) {
      //   console.log("yes");
      //   // res.status(400).json({
      //   //   success: fail,
      //   //   message: "Already Applied to this Job! Check Applied Jobs",
      //   // });
      //   // return;
      //   return next(
      //     new ErrorHandler(
      //       "Already Applied to this Job! Check Applied Jobs",
      //       400
      //     )
      //   );
      // }

      if (job.appliedUsers.some((user) => user._id.equals(user_id))) {
        console.log("yes");
        return next(
          new ErrorHandler(
            "Already Applied to this Job! Check Applied Jobs",
            400
          )
        );
      }

      job.appliedUsers.push(user_id);
      user.appliedJobs.push(job_id);

      await job.save();
      await user.save();

      res.status(200).json({
        success: true,
        message: "Job Applied Successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Route to update application status
router.post(
  "/update-application-status/:id",
  catchAsyncErrors(async (req, res) => {
    const { id } = req.params; // Job ID
    const { applicantId, status } = req.body; // Expecting { applicantId: 'userId', status: 'newStatus' }

    try {
      // Find the job by ID
      const job = await Job.findOne({
        "appliedUsers.id": applicantId,
        _id: id,
      });

      if (!job) {
        return res.status(404).json({ message: "Job or applicant not found" });
      }

      // Find the applicant in the job's appliedUsers array
      const applicantIndex = job.appliedUsers.findIndex(
        (user) => user.id === applicantId
      );

      if (applicantIndex === -1) {
        return res.status(404).json({ message: "Applicant not found" });
      }

      // Update the applicant's status
      job.appliedUsers[applicantIndex].applicationStatus = status;

      // Save the job document
      await job.save();

      res.status(200).json(job.appliedUsers[applicantIndex]);
    } catch (error) {
      console.error("Error updating status:", error);
      res.status(500).json({ message: "Server error" });
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
