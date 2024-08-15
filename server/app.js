const express = require("express");
const app = express();
const ErrorHandler = require("./utils/errorHandler");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
// const cors = require("cors");
const fileUpload = require("express-fileupload");

app.use(express.json());
app.use(cookieParser());
app.use("/test", (req, res) => {
  res.send("Hello world!");
});
app.use(fileUpload({ useTempFiles: true }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

// configuring the environment variables for development
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "./config/.env",
  });
}

// handling uncaught exception errors
app.use(ErrorHandler);

module.exports = app;
