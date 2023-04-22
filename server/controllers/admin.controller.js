const User = require("../models/user");

exports.findPendingVerificationRequests = async (req, res) => {
  try {
    const results = await User.find(
      { verified: false, role: "employer" },
      "name verified created email"
    ).exec();
    res.status(200).send({ results });
  } catch (err) {
    console.error(err);
    res.status(500).send({ err });
  }
};

exports.getAllEmployers = async (req, res) => {
  try {
    const results = await User.find(
      { role: "employer" },
      "name verified created email"
    ).exec();
    res.status(200).send({ results });
  } catch (err) {
    console.error(err);
    res.status(500).send({ err });
  }
};

exports.blockUser = async (req, res) => {
  try {
    const result = await User.findOneAndUpdate(
      { _id: req.body.targetUser },
      { verified: false }
    ).exec();
    res.status(200).send({ msg: "Success" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ err });
  }
};

exports.approveUser = async (req, res) => {
  try {
    const result = await User.findOneAndUpdate(
      { _id: req.body.targetUser },
      { verified: true }
    ).exec();
    res.status(200).send({ msg: "Success" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ err });
  }
};
