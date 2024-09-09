const express = require("express");
const app = express();
const ErrorHandler = require("./middlewares/error");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
// const fileUpload = require("express-fileupload");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/", express.static("uploads"));
app.use("/test", (req, res) => {
  res.send("Hello world!");
});
app.use(
  cors({
    origin: ["http://localhost:3000", "https://sih-hackathon.vercel.app"],
    credentials: true,
  })
);
// app.use(fileUpload({ useTempFiles: true }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "./config/.env",
  });
}

// Import Cloudinary configuration
const cloudinary = require("./config/cloudinaryConfig");

// import routes
const user = require("./controllers/user");
const employer = require("./controllers/employer");
const job = require("./controllers/job");
const event = require("./controllers/event");
const coupoun = require("./controllers/coupounCode");

app.use("/api/v1/user", user);
app.use("/api/v1/employer", employer);
app.use("/api/v1/job", job);
app.use("/api/v1/event", event);
app.use("/api/v1/coupoun", coupoun);

// handling uncaught exception errors
app.use(ErrorHandler);

module.exports = app;
