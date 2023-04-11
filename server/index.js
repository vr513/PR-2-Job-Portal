const express = require("express");
const mongoose = require("mongoose");

const morgan = require("morgan");
const cors = require("cors");

const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');
const employerRoutes = require('./routes/employer');
const applicantRoutes = require("./routes/applicant");

require("dotenv").config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
  console.log("Mongo connection successfull");
});

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(
    express.urlencoded({
      extended: true,
    })
);
app.use(userRoutes);
app.use(adminRoutes);
app.use(employerRoutes);
app.use(applicantRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("Listening on PORT " + PORT);
});