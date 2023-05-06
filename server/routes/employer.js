const express = require("express");
const router = express.Router();

const verifyToken = require("../middlewares/authJWT");
const {employerCheck ,verifiedEmployerCheck} = require("../middlewares/roleCheck");

const {saveEmployerDetails, getPostedJobs} = require('../controllers/employer.controller');
const {createNewJob , updateJobStatus, viewJobApplications} = require('../controllers/jobs.controller');

router.post('/save-employer-details',verifyToken,employerCheck,saveEmployerDetails);

router.post('/jobs/new',verifyToken,verifiedEmployerCheck,createNewJob);

router.post('/update-job-status',verifyToken,verifiedEmployerCheck,updateJobStatus);

router.post('/jobs/:id/applications',verifyToken,verifiedEmployerCheck,viewJobApplications);

router.get('/employer/jobs',verifyToken,verifiedEmployerCheck,getPostedJobs);

module.exports = router;