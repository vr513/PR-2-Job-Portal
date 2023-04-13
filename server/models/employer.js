const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employerSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    unique: [true, "index key already exists in database!"],
    index : true
  },
  gstNumber: {
    type: String,
    required: [true, "GST number not provided"],
  },
  companyDescription: {
    type: String,
    required: [true, "Company Description not provided"],
  },
  numberOfEmployees: {
    type: Number,
    required: [true, "Employee Details not provided"],
  },
  companyHeadquarters: {
    type: String,
    required: [true, "City name not provided"],
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
  allJobs: {
    type: [Schema.Types.ObjectId],
    ref: "Job",
    default: [],
  },
});

module.exports = mongoose.model("Employer", employerSchema);
