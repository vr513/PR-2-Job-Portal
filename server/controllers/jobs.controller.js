const Job = require("../models/job");
const Employer = require("../models/employer");

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
  }catch(err){
    res.status(500).send({ err });
  }
}