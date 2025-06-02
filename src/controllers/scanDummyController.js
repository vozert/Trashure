const pool = require("../utils/db");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  scanDummy: async (req, res) => {
    try {
      const userId = req.user.userId;
      const { jenis_sampah, uang_didapat } = req.body;
      if (!jenis_sampah || !uang_didapat || isNaN(uang_didapat) || uang_didapat <= 0) {
        return res.status(400).json({ error: "Jenis sampah dan uang didapat (angka positif) diperlukan" });
      }
      const scanId = uuidv4();
      const now = new Date();
      const scanQuery =
        "INSERT INTO Scan (id, user_id, jenis_sampah, uang_didapat, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING *";
      await pool.query(scanQuery, [scanId, userId, jenis_sampah, uang_didapat, now]);
      const saldoQuery =
        "INSERT INTO Saldo (id, user_id, saldo, updated_at) VALUES ($1, $2, $3, $4) ON CONFLICT (user_id) DO UPDATE SET saldo = Saldo.saldo + $3, updated_at = $4";
      const saldoId = uuidv4();
      await pool.query(saldoQuery, [saldoId, userId, uang_didapat, now]);
      const notificationId = uuidv4();
      const message = `Sampah ${jenis_sampah} berhasil dipindai, saldo +Rp${uang_didapat}`;
      const notificationQuery =
        "INSERT INTO Notification (id, user_id, message, created_at, is_read) VALUES ($1, $2, $3, $4, $5)";
      await pool.query(notificationQuery, [notificationId, userId, message, now, false]);
      res.json({
        success: true,
        jenis_sampah,
        uang_didapat,
        notification: message,
      });
    } catch (error) {
      console.error("Error in scanDummy:", error.message, error.stack);
      res.status(500).json({ error: error.message });
    }
  },
};