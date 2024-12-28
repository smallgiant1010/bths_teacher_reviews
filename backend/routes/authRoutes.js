const express = require("express");
const controller = require("../controllers/authController");
const router = express.Router();

router.post("/login", controller.post_login);

router.post("/signup", controller.post_signup);

module.exports = router;