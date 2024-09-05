const express = require("express");
const app = express();
const ErrorHandler = require("./middlewares/error");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
// const fileUpload = require("express-fileupload");

app.use(express.json());
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

// configuring the environment variables for development
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "./config/.env",
  });
}

// import routes
const user = require("./controllers/user");
const employer = require("./controllers/employer");
const job = require("./controllers/job");
const { OpenAI } = require("openai");
const chatBot = require("./controllers/chatBot");

app.use("/api/v1/user", user);
app.use("/api/v1/employer", employer);
app.use("/api/v1/job", job);
app.use("/api/v1/bot", chatBot);

// handling uncaught exception errors
app.use(ErrorHandler);

module.exports = app;
