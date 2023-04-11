const { default: mongoose } = require("mongoose");
const Applicant = require("../models/applicant");

exports.createApplicant = async (req, res) => {
  try {
    const applicant = new Applicant({
      userId: req.user._id,
      name: req.user.name,
      gender: req.body.gender,
      dateOfBirth: req.body.dateOfBirth,
      address: req.body.address,
      contactNumber: req.body.contactNumber,
      email: req.user.email,
      currentLocation: req.body.currentLocation,
      ...(req.body.alternateEmail && {
        alternateEmail: req.body.alternateEmail,
      }),
      currentLocation: req.body.currentLocation,
    });
    const response1 = await applicant.save();
    res.send({ msg: "Applicant registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ err });
  }
};

exports.updatePreferredLocations = async (req, res) => {
  try {
    const response1 = await Applicant.findOneAndUpdate(
      { userId: req.user._id },
      { $set: { preferredWorkLocation: req.body.preferredWorkLocation } }
    ).exec();
    res.status(200).send({ msg: "success" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ err });
  }
};

exports.updateAlternateEmail = async (req, res) => {
  try {
    const response1 = await Applicant.findOneAndUpdate(
      { userId: req.user._id },
      { $set: { alternateEmail: req.body.alternateEmail } }
    ).exec();
    res.status(200).send({ msg: "success" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ err });
  }
};

exports.updateContactNumber = async (req, res) => {
  try {
    const response1 = await Applicant.findOneAndUpdate(
      { userId: req.user._id },
      { $set: { contactNumber: req.body.contactNumber } }
    ).exec();
    res.status(200).send({ msg: "success" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ err });
  }
};

exports.updateAddress = async (req, res) => {
  try {
    const response1 = await Applicant.findOneAndUpdate(
      { userId: req.user._id },
      { $set: { address: req.body.address } }
    ).exec();
    res.status(200).send({ msg: "success" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ err });
  }
};

exports.updateCurrentLocation = async (req, res) => {
  try {
    const response1 = await Applicant.findOneAndUpdate(
      { userId: req.user._id },
      { $set: { currentLocation: req.body.currentLocation } }
    ).exec();
    res.status(200).send({ msg: "success" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ err });
  }
};

exports.updateKeySkills = async (req, res) => {
  try {
    const response1 = await Applicant.findOneAndUpdate(
      { userId: req.user._id },
      { $set: { keySkills: req.body.keySkills } }
    ).exec();
    res.status(200).send({ msg: "success" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ err });
  }
};

exports.addNewEmployment = async (req, res) => {
  try {
    const newWorkExp = {
      companyId: new mongoose.Types.ObjectId(),
      companyName: req.body.companyName,
      position: req.body.position,
      description: req.body.description,
      isCurrentJob: req.body.isCurrentJob,
      fromDate: req.body.fromDate,
      toDate: req.body.toDate,
    };
    const response1 = await Applicant.findOneAndUpdate(
      { userId: req.user._id },
      { $push: { employmentHistory: newWorkExp } }
    ).exec();
    res.status(200).send({ msg: "success" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ err });
  }
};

exports.updateEmployment = async (req, res) => {
  try {
    const updatedCompanyExperience = {
      companyId: req.body.companyId,
      companyName: req.body.companyName,
      position: req.body.position,
      description: req.body.description,
      isCurrentJob: req.body.isCurrentJob,
      fromDate: req.body.fromDate,
      toDate: req.body.toDate,
    };
    console.log(updatedCompanyExperience);
    const response1 = await Applicant.findOneAndUpdate(
      {
        userId: req.user._id,
        "employmentHistory.companyId": req.body.companyId,
      },
      { $set: { "employmentHistory.$": updatedCompanyExperience } }
    ).exec();
    res.status(200).send({ msg: "success" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ err });
  }
};
