const express = require("express");
const router = express.Router();
const historyController = require("../controllers/historyController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", authMiddleware, historyController.getScanHistory);

module.exports = router;