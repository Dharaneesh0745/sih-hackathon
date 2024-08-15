const app = require("./app");
const connectDatabase = require("./database/database");

// handling uncaught exception errors
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! Shutting down...");
  console.log(err.name, err.message);
  // process.exit(1);
});

// configuring the environment variables for development
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "./config/.env",
  });
}

// connect database
connectDatabase();

// create backend server
const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server is running on port ${process.env.PORT} - http://localhost:${process.env.PORT}`
  );
});

// handling unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
