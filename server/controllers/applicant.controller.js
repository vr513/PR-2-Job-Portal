const Applicant = require("../models/applicant");
const User = require("../models/user");

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
      minSalary:req.body.minSalary,
      currentLocation: req.body.currentLocation,
      ...(req.body.alternateEmail && {
        alternateEmail: req.body.alternateEmail,
      }),
    });
    const response1 = await applicant.save();
    const response = await User.findByIdAndUpdate(req.user._id, {
      referentialId: applicant._id,
    }).exec();
    if (!response1 || !response) {
      return res.status(404).send({ msg: "Invalid Arguments" });
    }
    return res.send({ msg: "Applicant registered successfully" });
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
    if (!response1) {
      return res.status(404).send({ msg: "Invalid Arguments" });
    }
    return res.status(200).send({ msg: "success" });
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
    if (!response1) {
      return res.status(404).send({ msg: "Invalid Arguments" });
    }
    return res.status(200).send({ msg: "success" });
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
    if (!response1) {
      return res.status(404).send({ msg: "Invalid Arguments" });
    }
    return res.status(200).send({ msg: "success" });
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
    if (!response1) {
      return res.status(404).send({ msg: "Invalid Arguments" });
    }
    return res.status(200).send({ msg: "success" });
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
    if (!response1) {
      return res.status(404).send({ msg: "Invalid Arguments" });
    }
    return res.status(200).send({ msg: "success" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ err });
  }
};

exports.updateKeySkills = async (req, res) => {
  try {
    const response1 = await Applicant.findOneAndUpdate(
      { userId: req.user._id },
      { $set: { keySkills: req.body.keySkills } },
      { new: true } // This option returns the updated document
    ).exec();
    if (!response1) {
      return res.status(404).send({ msg: "Invalid Arguments" });
    }
    return res.status(200).send({ msg: "success", user: response1 });
  } catch (err) {
    console.error(err);
    res.status(500).send({ err });
  }
};

exports.addNewProject = async(req,res) => {
  try{
    const newProject = {
      projectName : req.body.projectName,
      projectDescription : req.body.projectDescription,
      githubUrl : req.body.githubUrl,
      deploymentUrl : req.body.deploymentUrl
    }
    const response = await Applicant.findOneAndUpdate(
      { userId: req.user._id },
      {$push : {projects : newProject}},
      {new : true}
    ).exec();
    if (!response) {
      return res.status(404).send({ msg: "Invalid Arguments" });
    }
    return res.status(200).send({ msg: "success" , user : response });
  }catch(err){
    console.error(err);
    res.status(500).send({ err });
  }
}

exports.addNewEmployment = async (req, res) => {
  try {
    const newWorkExp = {
      companyName: req.body.companyName,
      position: req.body.position,
      description: req.body.description,
      isCurrentJob: req.body.isCurrentJob,
      fromDate: req.body.fromDate,
      toDate: req.body.toDate,
    };
    const response1 = await Applicant.findOneAndUpdate(
      { userId: req.user._id },
      { $push: { employmentHistory: newWorkExp } },
      { new: true }
    ).exec();
    if (!response1) {
      return res.status(404).send({ msg: "Invalid Arguments" });
    }
    return res.status(200).send({ msg: "success" , user : response1 });
  } catch (err) {
    console.error(err);
    res.status(500).send({ err });
  }
};

exports.updateEmployment = async (req, res) => {
  try {
    const {
      companyName,
      position,
      description,
      isCurrentJob,
      fromDate,
      toDate,
    } = req.body;
    const response1 = await Applicant.updateOne(
      { userId: req.user._id, "employmentHistory._id": req.body.companyId },
      {
        $set: {
          "employmentHistory.$.companyName": companyName,
          "employmentHistory.$.position": position,
          "employmentHistory.$.description": description,
          "employmentHistory.$.isCurrentJob": isCurrentJob,
          "employmentHistory.$.fromDate": fromDate,
          "employmentHistory.$.toDate": toDate,
        },
      }
    ).exec();
    if (!response1) {
      return res.status(404).send({ msg: "Invalid Arguments" });
    }
    return res.status(200).send({ msg: "success" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ err });
  }
};

exports.removeEmployment = async (req, res) => {
  try {
    const companyId = req.body.companyId;
    const response1 = await Applicant.findOneAndUpdate(
      {
        userId: req.user._id,
        "employmentHistory._id": companyId,
      },
      {
        $pull: { employmentHistory: { _id: companyId } },
      }
    ).exec();
    if (!response1) {
      return res.status(404).send({ msg: "Invalid Arguments" });
    }
    return res.status(200).send({ msg: "success" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ err });
  }
};

exports.addNewEducation = async (req, res) => {
  try {
    const newEducation = {
      degreeName: req.body.degreeName,
      collegeName: req.body.collegeName,
      dateOfCompletion: req.body.dateOfCompletion,
      actualGPA: req.body.actualGPA,
      maxGPA: req.body.maxGPA,
    };
    const response = await Applicant.findOneAndUpdate(
      { userId: req.user._id },
      { $push: { educationHistory: newEducation } },
      { new: true }
    ).exec();
    if (!response) {
      return res.status(404).send({ msg: "Education record not found" });
    }
    res.status(200).send({ msg: "Education record added successfully" , user : response });
  } catch (err) {
    console.error(err);
    res.status(500).send({ err });
  }
};

exports.updateEducation = async (req, res) => {
  try {
    const educationId = req.body.educationId;
    const { degreeName, collegeName, dateOfCompletion, actualGPA, maxGPA } =
      req.body;
    const response = await Applicant.findOneAndUpdate(
      { userId: req.user._id, "educationHistory._id": educationId },
      {
        $set: {
          "educationHistory.$.degreeName": degreeName,
          "educationHistory.$.collegeName": collegeName,
          "educationHistory.$.dateOfCompletion": dateOfCompletion,
          "educationHistory.$.actualGPA": actualGPA,
          "educationHistory.$.maxGPA": maxGPA,
        },
      }
    ).exec();
    if (!response) {
      return res.status(404).send({ msg: "Education record not found" });
    }
    return res
      .status(200)
      .send({ msg: "Education record updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ err });
  }
};

exports.removeEducation = async (req, res) => {
  try {
    const educationId = req.body.educationId;
    const response = await Applicant.findOneAndUpdate(
      {
        userId: req.user._id,
        "educationHistory._id": educationId,
      },
      {
        $pull: { educationHistory: { _id: educationId } },
      }
    ).exec();
    if (!response) {
      return res.status(404).send({ msg: "Education record not found" });
    }
    return res
      .status(200)
      .send({ msg: "Education record deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ err });
  }
};

exports.updateSalaryExpectations = async(req,res) => {
  try{
    const response = await Applicant.findByIdAndUpdate(req.user.referentialId,{minSalary : req.body.minSalary}).exec();
    return res.status(200).send({msg : "Salary expectations updated successfully"})
  }catch(err){
    console.error(err);
    res.status(500).send({ err });
  }
}

exports.getApplicantData = async(req,res) => {
  try{
    if(req.user.referentialId.equals(req.params.id)) return res.status(401).send({err : "Unauthorised Access"});
    const response = await Applicant.findById(req.params.id);
    if(!response) return res.status(400).send({err : "User not found"});
    return res.status(200).send({userData : response});
  }catch(err){
    console.error(err);
    res.status(500).send({ err });
  }
}

exports.savePersonalDetails = async(req, res) => {
  try {
    const { address, alternateEmail, dateOfBirth, contactNumber, gender, currentLocation } = req.body;
    const user = await Applicant.findById(req.user.referentialId);

    if (address) user.address = address;
    if(currentLocation) user.currentLocation = currentLocation;
    if (alternateEmail) user.alternateEmail = alternateEmail;
    if (dateOfBirth) user.dateOfBirth = dateOfBirth;
    if (contactNumber) user.contactNumber = contactNumber;
    if (gender) user.gender = gender;

    await user.save();
    res.status(200).send({ message: "Personal details updated successfully!", user : user });
  } catch (err) {
    console.error(err);
    res.status(500).send({ err });
  }
};

exports.saveJobPreferences = async(req,res) => {
  try{
    const {preferredWorkLocation , minSalary} = req.body;
    const user = await Applicant.findById(req.user.referentialId);

    if(preferredWorkLocation) user.preferredWorkLocation = preferredWorkLocation;
    if(minSalary) user.minSalary = minSalary;
    await user.save();
    res.status(200).send({ message: "Personal details updated successfully!", user : user });
  }catch(err){
    console.error(err);
    res.status(500).send({ err });
  }
}
