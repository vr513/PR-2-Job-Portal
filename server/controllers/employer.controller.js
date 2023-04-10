const Employer = require("../models/employer");

exports.saveEmployerDetails = async (req, res) => {
  try {
    const employer = new Employer({
      userId: req.user._id,
      gstNumber: req.body.gstNumber,
      companyDescription: req.body.companyDescription,
      numberOfEmployees: req.body.numberOfEmployees,
      companyHeadquarters: req.body.companyHeadquarters,
      contactNumber: req.body.contactNumber,
    });
    const response1 = employer.save();
    res.status(200).send({
      message: "Employer Registered successfully",
    });
  } catch (err) {
    res.status(500).send({ err });
  }
};
