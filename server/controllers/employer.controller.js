const Employer = require("../models/employer");
const Job = require("../models/job");
const User = require("../models/user");

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
    const response1 = await employer.save();
    const response2 = await User.findByIdAndUpdate(req.user_id , {referentialId : employer._id}).exec();
    res.status(200).send({
      message: "Employer Registered successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ err });
  }
};

exports.getApplicants = async(req,res) => {
  try{
    const { id } = req.params;
    const job = await Job.findById(id).populate('applicants');
  }catch(err){
    console.error(err);
    res.status(500).send({ err });
  }
}