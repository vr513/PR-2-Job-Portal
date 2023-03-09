const express = require("express");
const { signup, signin } = require("../controllers/auth.controller");
const jwt = require("jsonwebtoken");
const router = express.Router();

const verifyToken = require("../middlewares/authJWT");

router.post("/register", signup, (req, res) => {});

router.post("/signin", signin, (req, res) => {});

router.post("/refreshToken", verifyToken, (req, res) => {
  const token = jwt.sign(
    { id: req.user.id },
    process.env.PASSWORD_PRIVATE_KEY,
    {
      expiresIn: "5d",
    }
  );
  res.status(200).send({
    accessToken: token,
  });
});

module.exports = router;
