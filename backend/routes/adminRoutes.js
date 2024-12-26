const express = require("express");

const router = express.Router();

router.delete("/:id", controller.remove_specific_comment);

router.delete("/:id", controller.remove_all_related_comments);

module.exports = router;