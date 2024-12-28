const express = require("express");
const controller = require("../controllers/adminController")
const requireAuth = require("../middleware/adminMiddleware");

const router = express.Router();

router.get("/", controller.get_all_unbanned_users);

router.get("/banned", controller.get_all_banned_users);

router.post("/signin", controller.post_signin);

router.get("/signout", controller.get_signout);

router.post("/createAdmin", controller.post_createAdmin);

router.delete("/comments", requireAuth, controller.remove_all_related_comments);

router.patch("/ban", requireAuth, controller.patch_ban_user);

router.patch("/unban", requireAuth, controller.patch_unban_user);

router.post("/bulkTeachers", requireAuth, controller.post_bulk_teachers);

router.post("/bulkComments", requireAuth, controller.post_bulk_comments);

module.exports = router;