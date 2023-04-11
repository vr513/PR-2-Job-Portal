const Applicant = require("../models/applicant")

exports.createApplicant = async(req,res) => {
    try{
        const applicant = new Applicant({
            userId : req.user._id,
            name : req.body.name,
            gender : req.body.gender,
            dateOfBirth : req.body.dateOfBirth,
            address : req.body.address,
            contactNumber : req.body.contactNumber,
            email : req.user.email,
            ...(req.body.alternateEmail && { alternateEmail: req.body.alternateEmail }),
            currentLocation : req.body.currentLocation
        })
        const response1 = await applicant.save();
        res.send({msg : "Applicant registered successfully"});
    }catch(err){
        res.status(500).send({err});
    }
}