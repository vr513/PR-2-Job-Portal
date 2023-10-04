const User = require("../models/user");
const Employer = require("../models/employer");

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

exports.getAllEmployersDetails = async (req,res)=>{
  try {
    const results = await User.find({ role: "employer" })
      .populate({
        path: 'referentialId',
        select: 'gstNumber', // Select the GST number from the Employer model
        model: Employer,
      })
      .select('name verified created email gstNumber') // Include gstNumber in the select
      .exec();

    const formattedResults = results.map(user => ({
      _id: user._id,
      name: user.name,
      email: user.email,
      verified: user.verified,
      created: user.created,
      gstNumber: user.referentialId ? user.referentialId.gstNumber : null, // Retrieve GST number if available
    }));
    
    res.status(200).send({ results: formattedResults, timestamp: Date.now() });
  } catch (err) {
    console.error(err);
    res.status(500).send({ err });
  }
}

exports.getAllEmployers = async (req, res) => {
  try {
    const results = await User.find(
      { role: "employer" },
      "name verified created email"
    ).exec();
    res.status(200).send({ results : results , timestamp : Date.now() });
  } catch (err) {
    console.error(err);
    res.status(500).send({ err });
  }
};

exports.blockUser = async (req, res) => {
  console.log(req.body);
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
  console.log(req.body);
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
