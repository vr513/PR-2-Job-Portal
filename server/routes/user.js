const express = require("express");
const { signup, signin } = require("../controllers/auth.controller");
const jwt = require("jsonwebtoken");
const router = express.Router();

const verifyToken = require("../middlewares/authJWT");

router.post("/signup", signup, (req, res) => {});

router.post("/login", signin, (req, res) => {});

router.get("/refresh-token", verifyToken, (req, res) => {
  const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, {
    expiresIn: "5d",
  });
  res.status(200).send({
    accessToken: token,
    timestamp : Date.now()
  });
});

module.exports = router;
