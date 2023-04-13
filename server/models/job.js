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
    ref : 'User',
    required : true,
  },
  minWorkExperience : {
    type : Number
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
  applicants: {
    type : [Schema.Types.ObjectId],
    ref: "Applicant",
    default : []
  },
  salary : {
    type : Number,
    required : [true ,"Approximate Salary is required"]
  }
});

module.exports = mongoose.model('Job',jobsSchema);