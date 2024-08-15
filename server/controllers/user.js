const express = require("express");
const path = require("path");
const router = express.Router();
const User = require("../models/user");
const { upload } = require("../multer");
const ErrorHandler = require("../utils/errorHandler");
const fs = require("fs");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const sendToken = require("../utils/jwtToken");

router.post("/create-user", upload.single("file"), async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const userEmail = await User.findOne({ email });

    if (userEmail) {
      return next(new ErrorHandler("Email already exists, please login!", 400));
    }

    if (!req.file) {
      return next(new ErrorHandler("File not uploaded!", 400));
    }

    const filename = req.file.filename;
    const fileUrl = path.join(filename);
    const user = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      avatar: fileUrl,
    };

    const activationToken = createActivationToken(user);

    const activationUrl = `http://localhost:3000/activation/${activationToken}`;

    try {
      await sendMail({
        email: user.email,
        subject: "Activate your account",
        message: `Hello ${user.name}, please click on the link to activate your account: ${activationUrl}`,
      });
      res.status(201).json({
        success: true,
        message: `Please check your email:- ${user.email} to activate your account!`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// // create activation token
// const createActivationToken = (user) => {
//   return jwt.sign(user, process.env.ACTIVATION_SECRET, {
//     expiresIn: "5m",
//   });
// };

// Activation Route
router.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activation_token } = req.body;

      // Verify and decode the token
      const newUser = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );

      if (!newUser) {
        return next(new ErrorHandler("Invalid token", 400));
      }

      const { firstName, lastName, email, password, avatar } = newUser;

      let user = await User.findOne({ email });

      if (user) {
        return next(new ErrorHandler("User already exists", 400));
      }

      // Create a new user
      user = await User.create({
        firstName,
        lastName,
        email,
        avatar,
        password,
      });

      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler("Token has expired or is invalid!", 500));
    }
  })
);

// Create Activation Token
const createActivationToken = (user) => {
  const { firstName, lastName, email, password, avatar } = user;
  return jwt.sign(
    { firstName, lastName, email, password, avatar },
    process.env.ACTIVATION_SECRET,
    {
      expiresIn: "5m",
    }
  );
};

module.exports = router;
