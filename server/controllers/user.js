const express = require("express");
const path = require("path");
const router = express.Router();
const User = require("../models/user");
const { upload } = require("../multer");
const ErrorHandler = require("../utils/errorHandler");
const fs = require("fs");

router.post("/create-user", upload.single("file"), async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  const userEmail = await User.findOne({ email });

  if (userEmail) {
    const filename = req.file.filename;
    const filePath = `../uploads/${filename}`;
    fs.unlink(filePath, (err) => {
      if (err) {
        console.log(err);
        res
          .status(500)
          .json({ message: "Error occured while deleting a file!" });
      } else {
        res.status(201).json({ message: "File deleted successfully!" });
      }
    });
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

  console.log(user);

  const newUser = await User.create(user);
  res.status(201).json({
    success: true,
    newUser,
  });
});

module.exports = router;
