const jwt = require("jsonwebtoken");

const User = require("../models/user");

const verifyToken = async (req, res, next) => {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    let token = req.headers.authorization.split(" ")[1];
    let expired = false;
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findOne({ _id: decode.id });
      if (user === null) {
        res.status(401).send({ err: "Invalid authentication token" });
        return;
      } else {
        //we are adding the user info to the req object and from this middleware:
        req.user = user;
        next();
      }
    } catch (err) {
      console.log(err);
      res.status(401).send({ err: err });
    }
  } else {
    req.user = undefined;
    res.status(400).send({ err: "JWT Token is required" });
  }
};

module.exports = verifyToken;
