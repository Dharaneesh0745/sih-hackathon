const mongoose = require("mongoose");

const coupounCodeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your coupoun code name!"],
    // unique: true,
  },
  value: {
    type: Number,
    // required: true,
  },
  minAmount: {
    type: Number,
  },
  maxAmount: {
    type: Number,
  },
  companyId: {
    type: String,
    // required: true,
  },
  employer: {
    type: Object,
    // required: true,
  },
  selectedEvent: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("CoupounCode", coupounCodeSchema);
