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
} = require("../controllers/applicant.controller");

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
module.exports = router;