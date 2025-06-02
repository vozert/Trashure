const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", authMiddleware, notificationController.getNotifications);
router.post("/mark-read", authMiddleware, notificationController.markAsRead);

module.exports = router;