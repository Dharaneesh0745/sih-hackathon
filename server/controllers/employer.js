const express = require("express");
const path = require("path");
const router = express.Router();
// const ErrorHandler = require("../utils/errorHandler");
// const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const { upload } = require("../multer");
const sendMail = require("../utils/sendMail");
const sendToken = require("../utils/jwtToken");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const {
  isAuthenticated,
  isEmployerAuthenticated,
} = require("../middlewares/auth");
const Employer = require("../models/employer");
const sendEmployerToken = require("../utils/employerToken");
const Job = require("../models/job");

router.post("/create-employer", async (req, res, next) => {
  try {
    const {
      companyName,
      employerName,
      employerEmail,
      employerPhone,
      password,
      avatar,
    } = req.body;

    // Check if employer email already exists
    const existingEmail = await Employer.findOne({ employerEmail });
    if (existingEmail) {
      return next(new ErrorHandler("Email already exists, please login!", 400));
    }

    const employer = {
      companyName: companyName,
      employerName: employerName,
      employerEmail: employerEmail,
      employerPhone: employerPhone,
      password: password,
      avatar: avatar, // Cloudinary URL
    };

    // Create activation token and URL
    const activationToken = createActivationToken(employer);
    const activationUrl = `https://sih-hackathon.vercel.app/employer/activation/${activationToken}`;

    // Send activation email
    try {
      await sendMail({
        email: employer.employerEmail,
        subject: "Activate your account",
        message: `Hello ${employer.employerName}, please click on the link to activate your account: ${activationUrl}`,
      });
      res.status(201).json({
        success: true,
        message: `Please check your email:- ${employer.employerEmail} to activate your employer account!`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

router.get(
  "/applied-users/:employerId",
  catchAsyncErrors(async (req, res) => {
    try {
      const { employerId } = req.params;
      console.log(employerId);

      const jobs = await Job.find({ "employer._id": employerId });
      console.log(jobs);

      if (!jobs || jobs.length === 0) {
        return res
          .status(404)
          .json({ message: "No jobs found for this employer." });
      }

      const appliedUsers = jobs.map((job) => {
        return {
          jobId: job._id,
          jobTitle: job.title,
          appliedUsers: job.appliedUsers,
        };
      });

      return res.status(200).json({ jobs: appliedUsers });
    } catch (error) {
      console.error("Error fetching applied users:", error);
      return res.status(500).json({ message: "Internal server error." });
    }
  })
);

// Activation Route
router.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activation_token } = req.body;

      console.log("Received Activation Token:", activation_token);

      // Verify and decode the token
      const newEmployer = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );

      console.log("Decoded Token Data:", newEmployer);

      if (!newEmployer) {
        return next(new ErrorHandler("Invalid token", 400));
      }

      const {
        companyName,
        employerName,
        employerEmail,
        employerPhone,
        password,
        avatar,
      } = newEmployer;

      let employer = await Employer.findOne({ employerEmail });

      if (employer) {
        return next(new ErrorHandler("Employer already exists", 400));
      }

      // Create a new employer
      employer = await Employer.create({
        companyName,
        employerName,
        employerEmail,
        employerPhone,
        password,
        avatar,
      });

      sendEmployerToken(employer, 201, res);
    } catch (error) {
      console.log("Error during token verification:", error);
      return next(new ErrorHandler("Token has expired or is invalid!", 500));
    }
  })
);

// Create Activation Token
const createActivationToken = (employer) => {
  const {
    companyName,
    employerName,
    employerEmail,
    employerPhone,
    password,
    avatar,
  } = employer;
  return jwt.sign(
    {
      companyName,
      employerName,
      employerEmail,
      employerPhone,
      password,
      avatar,
    },
    process.env.ACTIVATION_SECRET,
    {
      expiresIn: "30m",
    }
  );
};

// login employer
router.post(
  "/login-employer",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { employerEmail, password } = req.body;

      if (!employerEmail && !password) {
        return next(new ErrorHandler("Please provide the all fields!", 400));
      }

      // console.log(employerEmail);

      const employer = await Employer.findOne({ employerEmail }).select(
        "+password"
      );

      //   console.log(employer);

      if (!employer) {
        return next(new ErrorHandler("Employer doesn't exists!", 400));
      }

      const isPasswordValid = await employer.comparePassword(password);

      if (!isPasswordValid) {
        return next(
          new ErrorHandler("Please provide the correct information", 400)
        );
      }

      sendEmployerToken(employer, 201, res);
    } catch (error) {
      console.log(error);
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Route to get an employer by ID
router.get(
  "/getIndEmployer/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      // Extract the employer ID from the request parameters
      const { id } = req.params;

      // Find the employer by ID
      const employer = await Employer.findById(id);

      // If no employer is found, return an error
      if (!employer) {
        return next(new ErrorHandler("Employer doesn't exist", 404));
      }
      console.log(employer);
      // Return the employer details
      res.status(200).json({
        success: true,
        employer,
      });
    } catch (error) {
      // Handle any unexpected errors
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// load employer
router.get(
  "/getemployer",
  isEmployerAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      // console.log(req.employer);
      const employer = await Employer.findById(req.employer.id);

      if (!employer) {
        return next(new ErrorHandler("Employer doesn't exists", 400));
      }

      // console.log(employer);

      res.status(200).json({
        success: true,
        employer,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// logout user
router.get(
  "/logout",
  catchAsyncErrors(async (req, res, next) => {
    try {
      res.cookie("employer_token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      res.status(201).json({
        success: true,
        message: "Log out successful!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
