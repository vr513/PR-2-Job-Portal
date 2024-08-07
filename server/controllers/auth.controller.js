const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/user");
const Applicant = require("../models/applicant");
const Employer = require("../models/employer");

exports.signup = async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    user.referentialId = user._id;
    const response = await user.save();
    res.status(200).send({
      message: "User Registered successfully",
    });
  } catch (err) {
    console.error(err);
    res
      .status(400)
      .send({ err: "Please try again with complete fields or diffrent email" });
  }
};

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user === null) {
      res.status(404).send({ err: "Invalid username or password" });
      return;
    } else {
      const isPasswordValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!isPasswordValid) {
        res.status(401).send({
          accessToken: null,
          error: "Invalid Username or password",
        });
        return;
      } else {
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
          expiresIn: "5d",
        });
        let response;
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
          userRole: user.role,
          message: "Login successfull",
          accessToken: token,
        });
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ err });
  }
};
