const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const applicantSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    unique: [true, "index key already exists in database!"],
    index: true,
  },
  name: {
    type: String,
    required: [true, "Name not provided"],
  },
  gender: {
    type: String,
    enum: ["male", "female", "others", "undisclosed"],
    required: [true, "Please specify user gender"],
  },
  dateOfBirth: {
    type: Date,
    required: [true, "Date of Birth not provided"],
  },
  address: {
    type: String,
    requried: [true, "Permanent address is required"],
  },
  contactNumber: {
    type: Number,
    required: [true, "Contact Details not provided"],
    validate: {
      validator: function (v) {
        return /^\d{10}$/.test(v);
      },
      message: "{VALUE} is not a valid contact number!",
    },
  },
  email: {
    type: String,
    unique: [true, "email already exists in database!"],
    lowercase: true,
    trim: true,
    required: [true, "email not provided"],
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: "{VALUE} is not a valid email!",
    },
  },
  alternateEmail: {
    type: String,
    lowercase: true,
    trim: true,
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: "{VALUE} is not a valid email!",
    },
  },
  currentLocation: {
    type: String,
    required: [true, "Current Location not provided"],
  },
  preferredWorkLocation: {
    type: [String],
    default: [],
  },
  resumeLink: {
    type: String,
    validate: {
      validator: function (v) {
        return /^https:\/\/firebasestorage\.googleapis\.com\/v0\/b\/[a-zA-Z0-9_-]+\.appspot\.com\/o\/.*$/.test(
          v
        );
      },
      message: "{VALUE} is not a valid contact number!",
    },
  },
  resumeHeadline: {
    type: String,
  },
  keySkills: {
    type: [String],
    default: [],
  },
  employmentHistory: {
    type: [
      {
        companyName: {
          type: String,
          required: [true, "Company Name not provided"],
        },
        position: {
          type: String,
          required: [true, "Position not provided"],
        },
        description: {
          type: String,
        },
        isCurrentJob: {
          type: Boolean,
          required: [true, "Job Status not provided"],
        },
        fromDate: {
          type: Date,
          required: [true, "Job Start date not provided"],
        },
        toDate: {
          type: Date,
        },
      },
    ],
    default: [],
  },
  educationHistory: {
    type: [
      {
        degreeName: {
          type: String,
          required: [true, "Name of degree not provided"],
        },
        collegeName: {
          type: String,
          requried: [true, "College of degree completion not provided"],
        },
        dateOfCompletion: {
          type: Date,
          required: [true, "Date of degree completion not provided"],
        },
        actualGPA: {
          type: Number,
          required: [true, "Current GPA score not provided"],
        },
        maxGPA: {
          type: Number,
          required: [true, "Max GPA score not provided"],
        },
      },
    ],
    default: [],
  },
  projects: {
    type: [
      {
        projectName: {
          type: String,
          required: [true, "Project Name not provided"],
        },
        projectDescription: {
          type: String,
          required: [true, "Project Description not provided"],
        },
        githubUrl: {
          type: String,
          validate: {
            validator: function (v) {
              return /^https?:\/\/github\.com\/[a-zA-Z0-9\-_]+\/[a-zA-Z0-9\-_]+$/.test(
                v
              );
            },
            message: "{VALUE} is not a valid github repo URL!",
          },
        },
        deploymentUrl: {
          type: String,
          validate: {
            validator: function (v) {
              return /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/.test(v);
            },
            message: "{VALUE} is not a valid deployment repo URL!",
          },
        },
      },
    ],
    default: [],
  },
  githubProfileUrl: {
    type: String,
    validate: {
      validator: function (v) {
        return /^https?:\/\/github\.com\/[a-zA-Z0-9\-_]+\/?$/.test(v);
      },
      message: "{VALUE} is not a valid Github profile URL!",
    },
  },
  linkedinProfileUrl: {
    type: String,
    validate: {
      validator: function (v) {
        return /^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9\-_]+\/?$/.test(
          v
        );
      },
      message: "{VALUE} is not a valid linkedin profile URL!",
    },
  },
  portfolioWebsiteUrl: {
    type: String,
    validate: {
      validator: function (v) {
        return /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/.test(v);
      },
      message: "{VALUE} is not a valid URL!",
    },
  },
  certificates: {
    type: [
      {
        issuingOrganisation: {
          type: String,
          required: [true, "Issuing Organisation is required"],
        },
        dateOfIssue: {
          type: Date,
          required: [true, "Date of Issue is required"],
        },
        certificateUrl: {
          type: String,
          required: [true, "Certificate Url is required"],
        },
        courseName: {
          type: String,
          required: [true, "Certificate Name is required"],
        },
      },
    ],
    default : []
  },
});

module.exports = mongoose.model("Applicant", applicantSchema);
