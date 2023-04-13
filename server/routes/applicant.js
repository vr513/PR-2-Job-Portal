const express = require("express");
const router = express.Router();

const verifyToken = require("../middlewares/authJWT");
const { applicantCheck } = require("../middlewares/roleCheck");

const {
  createApplicant,
  updatePreferredLocations,
  updateAlternateEmail,
  updateContactNumber,
  updateAddress,
  updateCurrentLocation,
  updateKeySkills,
  addNewEmployment,
  updateEmployment,
  removeEmployment,
  addNewEducation,
  updateEducation,
  removeEducation,
} = require("../controllers/applicant.controller");
const { applyToJob, getJobs } = require("../controllers/jobs.controller");

router.post("/create-applicant", verifyToken, applicantCheck, createApplicant);
router.post(
  "/update-location-preferences",
  verifyToken,
  applicantCheck,
  updatePreferredLocations
);
router.post(
  "/update-alternate-email",
  verifyToken,
  applicantCheck,
  updateAlternateEmail
);
router.post(
  "/update-contact-number",
  verifyToken,
  applicantCheck,
  updateContactNumber
);
router.post("/update-address", verifyToken, applicantCheck, updateAddress);
router.post(
  "/update-current-location",
  verifyToken,
  applicantCheck,
  updateCurrentLocation
);
router.post("/update-key-skills", verifyToken, applicantCheck, updateKeySkills);
router.post(
  "/add-new-employment",
  verifyToken,
  applicantCheck,
  addNewEmployment
);
router.post(
  "/update-employment-history",
  verifyToken,
  applicantCheck,
  updateEmployment
);
router.post(
  "/remove-employment-history",
  verifyToken,
  applicantCheck,
  removeEmployment
);
router.post(
  "/add-education",
  verifyToken,
  applicantCheck,
  addNewEducation
);
router.post(
  "/update-education",
  verifyToken,
  applicantCheck,
  updateEducation
);
router.post(
  "/remove-education",
  verifyToken,
  applicantCheck,
  removeEducation
);
router.post(
  "/jobs/:id/apply",
  verifyToken,
  applicantCheck,
  applyToJob
)
router.get('/jobs',verifyToken,applicantCheck,getJobs);
module.exports = router;