const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/user");

exports.signup = async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    const response = await user.save();
    res.status(200).send({
      message: "User Registered successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({ err: "Incomplete fields detected" });
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
        const token = jwt.sign(
          { id: user.id },
          process.env.PASSWORD_PRIVATE_KEY,
          { expiresIn: "5d" }
        );
        res.status(200).send({
          user: {
            id: user._id,
            email: user.email,
            fullName: user.fullName,
          },
          message: "Login successfull",
          accessToken: token,
        });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({ err });
  }
};
