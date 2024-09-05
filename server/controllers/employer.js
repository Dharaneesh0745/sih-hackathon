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

router.post(
  "/create-employer",
  upload.single("file"),
  async (req, res, next) => {
    try {
      const {
        companyName,
        employerName,
        employerEmail,
        employerPhone,
        password,
      } = req.body;
      const email = await Employer.findOne({ employerEmail });

      if (email) {
        return next(
          new ErrorHandler("Email already exists, please login!", 400)
        );
      }

      //   if (!req.file) {
      //     if (!user) {
      //       return next(new ErrorHandler("Please upload a file!", 400));
      //     } else {
      //       console.log("New Error Occurred: ", req.errored);
      //     }
      //     return next(new ErrorHandler("File not uploaded!", 400));
      //   }

      const filename = req.file.filename;
      const fileUrl = path.join(filename);
      const employer = {
        companyName: companyName,
        employerName: employerName,
        employerEmail: employerEmail,
        employerPhone: employerPhone,
        password: password,
        avatar: fileUrl,
      };

      const activationToken = createActivationToken(employer);

      const activationUrl = `https://sih-hackathon.vercel.app/employer/activation/${activationToken}`;

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
  }
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
