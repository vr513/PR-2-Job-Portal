const express = require("express");
const router = express.Router();

const verifyToken = require("../middlewares/authJWT");
const {employerCheck ,verifiedEmployerCheck} = require("../middlewares/roleCheck");

const {saveEmployerDetails} = require('../controllers/employer.controller');
const {createNewJob} = require('../controllers/jobs.controller');

router.post('/save-employer-details',verifyToken,employerCheck,saveEmployerDetails);

router.post('/create-new-job',verifyToken,verifiedEmployerCheck,createNewJob);

module.exports = router;