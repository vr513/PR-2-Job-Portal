const express = require("express");
const router = express.Router();

const verifyToken = require("../middlewares/authJWT");
const {adminCheck} = require("../middlewares/roleCheck");
const {findPendingVerificationRequests,getAllEmployers, blockUser , approveUser} = require('../controllers/admin.controller');

router.get("/pending-requests",verifyToken,adminCheck,findPendingVerificationRequests);

router.get("/all-employers",verifyToken,adminCheck,getAllEmployers);

router.post('/block-employer',verifyToken,adminCheck,blockUser);

router.post("/approve-employer",verifyToken,adminCheck,approveUser);

module.exports = router;