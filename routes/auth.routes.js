const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

// Generate JWT Token
router.post("/jwt", (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "7d" });
  res
    .cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    })
    .json({ success: true });
});

// Logout - Clear Cookie
router.post("/logout", (req, res) => {
  res
    .clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    })
    .json({ success: true });
});

module.exports = router;