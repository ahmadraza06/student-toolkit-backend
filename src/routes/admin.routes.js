

const express = require("express");
const router = express.Router();

const { protect } = require("../middlewares/auth.middleware");
const { adminOnly } = require("../middlewares/admin.middleware");
const { getStats } = require("../controllers/admin.controller");

router.get("/stats", protect, adminOnly, getStats);

module.exports = router;