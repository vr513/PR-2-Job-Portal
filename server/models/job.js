const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobsSchema = new Schema({
  jobTitle: {
    type: String,
    required: [true, "Job Title is not provided"],
  },
  companyName: {
    type: String,
    required: [true, "Company name is not provided"],
  },
  companyId : {
    type : Schema.Types.ObjectId,
    ref : 'employers',
    required : true,
  },
  workExperience: {
    minExp: {
      type: Number,
      required: true,
    },
    maxExp: {
      type: Number,
      required: true,
    },
  },
  jobLocations: {
    type: [String],
    default: [],
    required: true,
  },
  jobDescription : {
    type: String,
    required: [true, "Job Description is not provided"],
  },
  active: {
    type : Boolean,
    required: [true, "Active State is not provided"],
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Job',jobsSchema);