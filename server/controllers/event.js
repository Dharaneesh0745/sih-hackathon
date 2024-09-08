const express = require("express");
const router = express.Router();
const Event = require("../models/event");
const { upload } = require("../multer");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const Employer = require("../models/employer");
const { isEmployerAuthenticated } = require("../middlewares/auth");

// create event
router.post(
  "/create-event",
  upload.array("images"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const companyId = req.body.companyId;
      console.log("Received companyId:", companyId);

      const company = await Employer.findById(companyId);
      console.log("Company found:", company);

      if (!company) {
        console.log("Company not found");
        return next(new ErrorHandler("Company not found", 404));
      }

      const files = req.files;
      const imageUrls = files.map((file) => file.filename); // Correct key used here
      const eventData = req.body;
      eventData.images = imageUrls.length > 0 ? imageUrls : [];
      eventData.employer = company;

      console.log("Creating event with data:", eventData);

      const event = await Event.create(eventData);
      console.log("event created successfully:", event);

      res.status(201).json({
        success: true,
        event,
      });
      console.log("Response sent successfully");
    } catch (error) {
      console.error("Error in event creation:", error.message);
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// get all events of a shop
router.get(
  "/getAllEvents/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const events = await Event.find({ companyId: req.params.id });
      res.status(200).json({
        success: true,
        events,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// delete event of a company
router.delete(
  "/deleteEvent/:id",
  isEmployerAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const eventId = req.params.id;
      const event = await Event.findByIdAndDelete(eventId);

      if (!event) {
        return next(new ErrorHandler("event not found", 404));
      }

      res.status(200).json({
        success: true,
        message: "Event deleted successfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
