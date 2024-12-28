// imports
const express = require("express")
const controller = require("../controllers/teacherController");
const requireAuth = require("../middleware/authMiddleware");

// Initializations
const router = express.Router();

// Routes
router.get("/", controller.get_all_teachers);

router.get("/teacher/:id", controller.get_specific_teacher);

router.get("/comment/:id", controller.get_specific_comments);

router.get("/category", controller.get_categorized_teachers);

router.post("/newTeachers", requireAuth, controller.post_new_teacher);

router.post("/comment/:id", requireAuth, controller.post_specific_comment);

router.delete("/comment/:id", requireAuth, controller.remove_specific_comment);


module.exports = router;

