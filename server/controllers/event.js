const express = require("express");
const router = express.Router();
const Event = require("../models/event");
const { upload } = require("../multer");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const Employer = require("../models/employer");
const { isEmployerAuthenticated } = require("../middlewares/auth");

router.post(
  "/create-event",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const {
        name,
        image,
        eventStartDate,
        eventEndDate,
        description,
        category,
        theme,
        tags,
        originalPrice,
        discountPrice,
        location,
        locationType,
        totalSlots,
        companyId,
        eventType,
      } = req.body;

      // console.log("Received companyId:", companyId, image);

      // Fetch the employer using the companyId
      const employer = await Employer.findById(companyId);

      if (!employer) {
        return res.status(404).json({ message: "Employer not found" });
      }

      // Create a new event
      const newEvent = new Event({
        name,
        image,
        eventType,
        eventStartDate,
        eventEndDate,
        description,
        category,
        theme,
        tags,
        originalPrice,
        discountPrice,
        location,
        locationType,
        totalSlots,
        companyId,
        employer: employer, // Embedding the employer object
      });

      // Save the event to the database
      await newEvent.save();

      res.status(201).json({ success: true, event: newEvent });
    } catch (error) {
      console.error("Error creating event:", error);
      res.status(500).json({ message: "Internal server error" });
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

// Get all events
router.get(
  "/getAllEvents",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const events = await Event.find();
      console.log(events);
      res.status(200).json({
        success: true,
        events: events,
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
