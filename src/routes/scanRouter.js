const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const scanDummyController = require("../controllers/scanDummyController");

router.get("/scan", (req, res) => res.json({ message: "Scan disabled temporarily" }));
router.post("/scan-dummy", authMiddleware, scanDummyController.scanDummy);

module.exports = router;