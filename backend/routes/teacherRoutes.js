// imports
const express = require("express")
const controller = require("../controllers/teacherController");
const requireAuth = require("../middleware/authMiddleware");

// Initializations
const router = express.Router();
router.use(requireAuth);

// Routes
router.get("/", controller.get_all_teachers);

router.get("/teacher/:id", controller.get_specific_teacher);

router.get("/comment/:id", controller.get_specific_comments);

router.get("/category", controller.get_categorized_teachers);

router.post("/newTeachers", controller.post_new_teacher);

router.post("/comment/:id", controller.post_specific_comment);

router.post("/bulkTeachers", controller.post_bulk_teachers);

router.post("/bulkComments", controller.post_bulk_comments);


module.exports = router;

