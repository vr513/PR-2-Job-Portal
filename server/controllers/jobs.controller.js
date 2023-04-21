const Job = require("../models/job");
const Employer = require("../models/employer");
const Applicant = require("../models/applicant");

exports.createNewJob = async (req, res) => {
  try {
    const job = new Job({
      jobTitle: req.body.jobTitle,
      companyName: req.body.companyName,
      companyId: req.user._id,
      minWorkExperience: req.body.minWorkExperience,
      jobLocations: req.body.jobLocations,
      active: true,
      jobDescription: req.body.jobDescription,
      salary: req.body.salary,
    });
    const response1 = await job.save();
    const response2 = await Employer.findOneAndUpdate(
      { userId: req.user._id },
      { $push: { allJobs: job._id } }
    ).exec();
    res.status(200).send({
      message: "Job Posted successfully",
    });
  } catch (err) {
    res.status(500).send({ err });
  }
};

exports.updateJobStatus = async (req, res) => {
  try {
    const response1 = await Job.updateOne(
      { companyId: req.user.id, _id: req.body.targetJobId },
      { active: req.body.jobActiveStatus }
    ).exec();
    res.send({ response1 });
  } catch (err) {
    console.error(err);
    res.status(500).send({ err });
  }
};

exports.applyToJob = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }
    if (job.active === false) {
      return res.status(400).json({ error: "Job listing is not active" });
    }
    if (job.applicants.includes(req.user.referentialId)) {
      return res
        .status(400)
        .json({ error: "You have already applied to this job" });
    }
    job.applicants.push(req.user.referentialId);
    const response = await job.save();
    return res.status(200).send({ msg: "Applied to Job successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ err });
  }
};

exports.viewJobApplications = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id).populate("applicants");
    if (!job.companyId.equals(req.user._id)) {
      return res.status(400).json({ error: "Unauthorised Access" });
    }
    return res.status(200).send({ applications: job.applicants });
  } catch (err) {
    console.error(err);
    res.status(500).send({ err });
  }
};

exports.getJobs = async (req, res) => {
  try {
    let { minSalary, preferredJobLocations } = req.query;
    preferredJobLocations = JSON.parse(preferredJobLocations);
    let jobs = await Job.find({ active: true }).sort({ salary: -1 });
    if (minSalary) {
      jobs = jobs.filter((job) => job.salary >= minSalary);
    }
    if (preferredJobLocations) {
      const preferredJobs = jobs.filter((job) =>
        job.jobLocations.some((location) =>
          preferredJobLocations.includes(location)
        )
      );
      const otherJobs = jobs.filter((job) => !preferredJobs.includes(job));
      jobs = [...preferredJobs, ...otherJobs];
    }
    return res.status(200).send({jobs})
  } catch (err) {
    console.error(err);
    res.status(500).send({ err });
  }
};
