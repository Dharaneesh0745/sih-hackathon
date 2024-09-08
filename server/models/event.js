const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: [true, "Please enter the job tite"],
  },
  eventStartDate: {
    type: Date,
  },
  eventEndDate: {
    type: Date,
  },
  status: {
    type: String,
    default: "Not Started Yet",
  },
  description: {
    type: String,
    // required: [true, "Please enter the job description"],
  },
  category: {
    type: String,
    // required: [true, "Please enter the job category"],
  },
  theme: {
    type: String,
    // required: [true, "Please enter the job category"],
  },
  tags: {
    type: String,
    // required: [true, "Please enter the job tags"],
  },
  originalPrice: {
    type: String,
    // required: [true, "Please enter the job salary"],
  },
  discountPrice: {
    type: String,
    // required: [true, "Please enter the job salary"],
  },
  companyId: {
    type: String,
    // required: true,
  },
  employer: {
    type: Object,
    // required: true,
  },
  images: [
    {
      type: String, // Correcting the typo from 'typr' to 'type'
    },
  ],
  locationType: {
    type: String,
    // required: true,
  },
  location: {
    type: String,
    // required: true,
  },
  totalSlots: {
    type: String,
    // required: true,
  },
  totalApplied: {
    type: String,
    // required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Event", eventSchema);
