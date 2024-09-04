const express = require("express");
const path = require("path");
const router = express.Router();
const User = require("../models/user");
const { upload } = require("../multer");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const sendToken = require("../utils/jwtToken");
const { isAuthenticated } = require("../middlewares/auth");

router.post("/create-user", upload.single("file"), async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const userEmail = await User.findOne({ email });

    if (userEmail) {
      return next(new ErrorHandler("Email already exists, please login!", 400));
    }

    if (!req.file) {
      if (!user) {
        return next(new ErrorHandler("Please upload a file!", 400));
      } else {
        console.log("New Error Occurred: ", req.errored);
      }
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

    const activationUrl = `https://sih-hackathon.vercel.app/activation/${activationToken}`;

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

// login user
router.post(
  "/login-user",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email && !password) {
        return next(new ErrorHandler("Please provide the all fields!", 400));
      }

      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        return next(new ErrorHandler("User doesn't exists!", 400));
      }

      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return next(
          new ErrorHandler("Please provide the correct information", 400)
        );
      }

      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// load user
router.get(
  "/getuser",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);

      if (!user) {
        return next(new ErrorHandler("User doesn't exists", 400));
      }

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update user skills
router.post(
  "/update-skills/:id",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);

      if (!user) {
        return next(new ErrorHandler("User doesn't exists", 400));
      }

      const { technicalSkills, nonTechnicalSkills } = req.body;

      user.technicalSkills = technicalSkills || user.technicalSkills;
      user.nonTechnicalSkills = nonTechnicalSkills || user.nonTechnicalSkills;

      await user.save();

      res.status(200).json({
        success: true,
        message: "User Skills updated successfully",
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update primary data
router.post(
  "/update-primary-details/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);

      if (!user) {
        return next(new ErrorHandler("User doesn't exist", 400));
      }

      const {
        firstName,
        lastName,
        recoveryEmail,
        phoneNumber,
        dateOfBirth,
        gender,
        country,
        state,
        city,
        address1,
        address2,
        zipCode,
        addressType,
      } = req.body;

      user.firstName = firstName || user.firstName;
      user.lastName = lastName || user.lastName;
      user.recoveryEmail = recoveryEmail || user.recoveryEmail;
      user.phoneNumber = phoneNumber || user.phoneNumber;
      user.dateOfBirth = dateOfBirth || user.dateOfBirth;
      user.gender = gender || user.gender;
      user.country = country || user.country;
      user.city = city || user.city;
      user.state = state || user.state;
      user.address1 = address1 || user.address1;
      user.address2 = address2 || user.address2;
      user.zipCode = zipCode || user.zipCode;
      user.addressType = addressType || user.addressType;

      await user.save();

      res.status(200).json({
        success: true,
        message: "User primary details updated successfully",
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// get users dynamic
router.get(
  "/view-user/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const view_user = await User.findById(req.params.id);

      if (!view_user) {
        return next(new ErrorHandler("User doesn't exists", 400));
      }

      res.status(200).json({
        success: true,
        view_user,
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
      res.cookie("token", null, {
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
