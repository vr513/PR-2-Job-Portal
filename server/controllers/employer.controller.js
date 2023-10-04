const Applicant = require("../models/applicant");
const Employer = require("../models/employer");
const Job = require("../models/job");
const User = require("../models/user");

exports.saveEmployerDetails = async (req, res) => {
  try {
    const employer = new Employer({
      userId: req.user._id,
      name : req.user.name,
      gstNumber: req.body.gstNumber,
      companyDescription: req.body.companyDescription,
      numberOfEmployees: req.body.numberOfEmployees,
      companyHeadquarters: req.body.companyHeadquarters,
      contactNumber: req.body.contactNumber,
    });
    console.log(req);
    const response1 = await employer.save();
    const response2 = await User.findByIdAndUpdate(req.user._id , {referentialId : employer._id}).exec();
    console.log("below error")
    console.log(response2);

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

exports.getApplicantDetails = async(req,res) => {
  try{
    const { jobId, applicantId } = req.params;
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).send({ message: "Job not found" });
    }
    const applicantData = job.applicants.find(
      (applicant) => applicant._id.toString() === applicantId
    );
    if (!applicantData) {
      return res.status(404).send({ message: "Applicant not found" });
    }
    const userData = await Applicant.findById(applicantData);
    return res.send({ user : userData });

  }catch(err){
    console.error(err);
    res.status(500).send({ err });
  }
}

exports.getPostedJobs = async(req,res) => {
  try{
    const employer = await Employer.findById(req.user.referentialId).populate('allJobs');

    const jobs = employer.allJobs.map((job) => ({
      jobId : job._id,
      jobTitle: job.jobTitle,
      active: job.active,
      created: job.created,
      applicants: job.applicants,
      numOfApplicants : job.applicants.length,
    }));

    res.status(200).send({jobs});
  }catch(err){
    console.error(err);
    res.status(500).send({ err });
  }
}

exports.getTopEmployers = async (req, res) => {
  try {
    const result = await Employer.find().sort({ "allJobs.length": -1 }).limit(3);
    res.status(200).send({companies : result});
  } catch (err) {
    console.error(err);
    res.status(500).json({ err });
  }
};

exports.employerExists = async(req,res) =>{
  try{
    const employer = await Employer.findById(req.user.referentialId);
    if(employer){
      return res.status(200).json({message:'Employer exists',employer});
    }else{
      return res.status(404).json({menubar:'employter doesnt exist'})
    }
  }catch(err){
    res.status(500).json({err:'server error'})
  }
}