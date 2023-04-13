const Job = require("../models/job");
const Employer = require("../models/employer");
const Applicant = require("../models/applicant")

exports.createNewJob = async (req, res) => {
  try {
    const job = new Job({
      jobTitle: req.body.jobTitle,
      companyName: req.body.companyName,
      companyId: req.user._id,
      workExperience: {
        minExp: req.body.minExp,
        maxExp: req.body.maxExp,
      },
      jobLocations: req.body.jobLocations,
      active: true,
      jobDescription: req.body.jobDescription,
    });
    const response1 = await job.save();
    const response2 = await Employer.findOneAndUpdate(
      { userId: req.user._id },
      { $push : { allJobs: job._id } },
    ).exec();
    res.status(200).send({
      message: "Job Posted successfully",
    });    
  } catch (err) {
    res.status(500).send({ err });
  }
};


exports.updateJobStatus = async(req,res) => {
  try{
    const response1 = await Job.updateOne(
      { companyId: req.user.id, _id: req.body.targetJobId },
      { active : req.body.jobActiveStatus }
    ).exec();
    res.send({response1});
  }catch (err) {
    console.error(err);
    res.status(500).send({ err });
  }
}

exports.applyToJob = async(req,res) => {
  try{
    const {id} = req.params;
    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    if(job.active === false){
      return res.status(400).json({error : "Job listing is not active"});
    }
    if (job.applicants.includes(req.user.referentialId)) {
      return res.status(400).json({ error: 'You have already applied to this job' });
    }
    job.applicants.push(req.user.referentialId);
    const response = await job.save();
    return res.status(200).send({msg : "Applied to Job successfully"});
  }catch(err){
    console.error(err);
    res.status(500).send({ err });
  }
}

exports.viewJobApplications = async(req,res) => {
  try{
    const { id } = req.params;
    const job = await Job.findById(id).populate('applicants');
    if(!job.companyId.equals(req.user._id)){
      return res.status(400).json({ error: 'Unauthorised Access' });
    }
    return res.status(200).send({applications : job.applicants});
  }catch(err){
    console.error(err);
    res.status(500).send({ err });
  }
}