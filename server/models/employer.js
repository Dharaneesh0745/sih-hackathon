const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const employerSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: [true, "Please enter your company name!"],
  },
  employerName: {
    type: String,
    required: [true, "Please enter your employer name!"],
  },
  employerEmail: {
    type: String,
    required: [true, "Please enter your employer email address"],
  },
  employerPhone: {
    type: Number,
    required: [true, "Please enter your employer phone number"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [6, "Password should be greater than 6 characters"],
    select: false,
  },
  description: {
    type: String,
  },
  role: {
    type: String,
    default: "employer",
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  country: {
    type: String,
  },
  zipcode: {
    type: Number,
  },
  avatar: {
    // public_id: {
    //   type: String,
    //   // required: true,
    // },
    // url: {
    type: String,
    required: true,
    // },
  },
  industryType: {
    type: String,
  },
  companyWebsite: {
    type: String,
  },
  companySize: {
    type: String,
  },
  companyVerification: {
    type: Boolean,
    default: false,
  },
  verificationProof: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
  resetPasswordToken: String,
  resetPasswordTime: Date,
});

// Hash password
employerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// jwt token
employerSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

// comapre password
employerSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("Employer", employerSchema);
