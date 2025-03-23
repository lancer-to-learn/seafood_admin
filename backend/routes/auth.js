const express = require("express");
const { register, verifyByPhone, verifyOTP, login, refreshToken } = require("../controllers/authController");

const router = express.Router();

router.post("/register", register);
router.post("/verify", verifyOTP);
router.post("/login", login);
router.post("/refresh", refreshToken)
module.exports = router;
