// imports
const express = require("express")
const controller = require("../controllers/teacherController");
const requireAuth = require("../middleware/authMiddleware");

// Initializations
const router = express.Router();
router.use(requireAuth);

// Routes
router.get("/", controller.get_all_teachers);

router.get("/:id", controller.get_specific_teacher);

router.get("/:id", controller.get_specific_comments);

router.get("/category", controller.get_categorized_teachers);

router.post("/newTeacher", controller.post_new_teacher);

router.post("/:id", controller.post_specific_comment);

module.exports = router;

