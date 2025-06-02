const express = require("express");
const router = express.Router();
const saldoController = require("../controllers/saldoController");
const authMiddleware = require("../middlewares/authMiddleware");

// Ambil saldo user
router.get("/", authMiddleware, saldoController.getSaldo);

module.exports = router;
