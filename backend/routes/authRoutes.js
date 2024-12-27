const express = require("express");
const controller = require("../controllers/authController");
const requireAuth = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/login", controller.post_login);

router.post("/signup", controller.post_signup);

router.get("/logout", controller.get_logout);

module.exports = router;