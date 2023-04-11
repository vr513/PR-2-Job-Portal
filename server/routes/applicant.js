const express = require("express");
const router = express.Router();

const verifyToken = require("../middlewares/authJWT");
const {applicantCheck} = require("../middlewares/roleCheck");

const {createApplicant} = require("../controllers/applicant.controller");

router.post("/create-applicant",verifyToken,applicantCheck,createApplicant);

module.exports = router;