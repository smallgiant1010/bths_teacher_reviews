const express = require("express");
const controller = require("../controllers/adminController")
const requireAuth = require("../middleware/adminMiddleware");

const router = express.Router();

router.get("/", requireAuth, controller.get_all_unbanned_users);

router.get("/banned", requireAuth, controller.get_all_banned_users);

router.post("/signin", controller.post_signin);

router.post("/createAdmin", requireAuth, controller.post_createAdmin);

router.delete("/comments", requireAuth, controller.remove_all_related_comments);

router.patch("/ban", requireAuth, controller.patch_ban_user);

router.patch("/unban", requireAuth, controller.patch_unban_user);

router.patch("/newTeacherImages", requireAuth, controller.patch_img_url);

router.post("/bulkTeachers", requireAuth, controller.post_bulk_teachers);

router.post("/bulkComments", requireAuth, controller.post_bulk_comments);

router.delete("/exterminateComments", requireAuth, controller.remove_all_comments);

router.delete("/filterDuplicates", requireAuth, controller.delete_duplicates);

router.patch("/updateTeacherProperties", requireAuth, controller.patch_properties);

router.patch("/updateAverages", requireAuth, controller.update_averages);

module.exports = router;