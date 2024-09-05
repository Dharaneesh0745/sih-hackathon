const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    // required: [true, "Please enter the job tite"],
  },
  description: {
    type: String,
    // required: [true, "Please enter the job description"],
  },
  category: {
    type: String,
    // required: [true, "Please enter the job category"],
  },
  tags: {
    type: String,
    // required: [true, "Please enter the job tags"],
  },
  salary: {
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
  location: {
    type: String,
    // required: true,
  },
  experience: {
    type: String,
    // required: true,
  },
  skills: {
    type: String,
    // required: true,
  },
  jobType: {
    type: String,
    // required: true,
  },
  locationType: {
    type: String,
    // required: true
  },
  education: {
    type: String,
    // required: true,
  },
  deadline: {
    type: String,
    // required: true,
  },
  vacancy: {
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

module.exports = mongoose.model("Job", jobSchema);
