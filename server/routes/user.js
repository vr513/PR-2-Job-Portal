const express = require("express");
const { signup, signin } = require("../controllers/auth.controller");
const jwt = require("jsonwebtoken");
const router = express.Router();
const Applicant = require("../models/applicant");
const Employer = require("../models/employer");

const verifyToken = require("../middlewares/authJWT");

router.post("/signup", signup, (req, res) => {});

router.post("/login", signin, (req, res) => {});

router.get("/refresh-token", verifyToken, (req, res) => {
  const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, {
    expiresIn: "5d",
  });
  res.status(200).send({
    accessToken: token,
    timestamp: Date.now(),
  });
});

router.get("/refetch-user-data", verifyToken, async (req, res) => {
  try {
    let response;
    const user = req.user;
    if (user.role === "applicant")
      response = await Applicant.findById(user.referentialId);
    else if (user.role === "employer")
      response = await Employer.findById(user.referentialId);
    else {
      response = {
        id: user._id,
        email: user.email,
      };
    }
    res.status(200).send({
      userData: response,
      timestamp: Date.now(),
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ err });
  }
});

module.exports = router;
