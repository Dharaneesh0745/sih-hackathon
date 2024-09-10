const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please enter your first name!"],
  },
  lastName: {
    type: String,
    required: [true, "Please enter your last name!"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email!"],
  },
  recoveryEmail: {
    type: String,
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [4, "Password should be greater than 4 characters"],
    select: false,
  },
  phoneNumber: {
    type: Number,
  },
  country: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  address1: {
    type: String,
  },
  preferredJobRole: {
    type: String,
  },
  zipCode: {
    type: Number,
  },
  addressType: {
    type: String,
  },
  dateOfBirth: {
    type: String,
  },
  roadMapData: {
    type: String,
    default: "None",
  },
  gender: {
    type: String,
  },
  resumeGenerated: {
    type: Boolean,
  },
  resume: {
    type: String,
  },
  linkedinProfile: {
    type: String,
  },
  githubProfile: {
    type: String,
  },
  portfolioUrl: {
    type: String,
  },
  technicalSkills: {
    type: String,
  },
  education: [
    {
      degree: {
        type: String,
      },
      universityName: {
        type: String,
      },
      fieldOfStudy: {
        type: String,
      },
      graduationYear: {
        type: Number,
      },
    },
  ],
  experience: [
    {
      companyName: {
        type: String,
      },
      role: {
        type: String,
      },
      duration: {
        type: String, // You might want to use a more specific type like an object with start and end dates
      },
      learnedSkills: {
        type: String,
      },
      description: {
        type: String,
      },
    },
  ],
  achievements: [
    {
      certificateUrl: {
        type: String, // This will store the URL of the uploaded certificate
      },
      certificateName: {
        type: String,
      },
      issueDate: {
        type: Date,
      },
      skillsAcquired: {
        type: String,
      },
      duration: {
        type: String, // You might want to use a more specific type like an object with start and end dates
      },
    },
  ],
  projects: [
    {
      name: {
        type: String,
      },
      theme: {
        type: String,
      },
      domain: {
        type: String,
      },
      startDate: {
        type: Date,
      },
      endDate: {
        type: Date,
      },
      currentlyWorking: {
        type: Boolean,
        default: false,
      },
      skillsAcquired: {
        type: String,
      },
      description: {
        type: String,
      },
      images: [
        {
          type: String, // Stores the URL of the uploaded project images
        },
      ],
    },
  ],
  nonTechnicalSkills: {
    type: String,
  },
  employmentStatus: {
    type: String,
  },
  yearsOfExperience: {
    type: Number,
  },
  highestLevelOfEducation: {
    type: String,
  },
  universityName: {
    type: String,
  },
  degree: {
    type: String,
  },
  fieldOfStudy: {
    type: String,
  },
  graduationYear: {
    type: Number,
  },
  desiredJobRole: {
    type: String,
  },
  desiredJobLocation: {
    type: String,
  },
  employmentType: {
    type: String,
  },
  appliedJobs: [
    {
      id: {
        type: String,
      },
      jobTitle: {
        type: String,
      },
      companyName: {
        type: String,
      },
      appliedOn: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  appliedEvents: [
    {
      type: String,
    },
  ],
  competencyScore: {
    type: Number,
  },
  totalPoints: {
    type: Number,
  },
  skillGapAnalysis: {
    type: String,
  },
  role: {
    type: String,
    default: "user",
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
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  resetPasswordToken: String,
  resetPasswordTime: Date,
});

//  Hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// jwt token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

// compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
