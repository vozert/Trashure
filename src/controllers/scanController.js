const axios = require("axios");
const pool = require("../utils/db");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

// Controller untuk fitur scan sampah dengan model ML Python
exports.scanWaste = async (req, res) => {
  try {
    const userId = req.user.userId;
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Gambar tidak ditemukan." });
    }
    // Kirim gambar ke API ML Python (base64)
    const mlResponse = await axios.post(process.env.ML_API_URL, {
      image: req.file.buffer.toString("base64"),
    });
    const { jenis_sampah } = mlResponse.data;
    // Mapping jenis sampah ke uang
    const jenisSampahList = [
      { jenis: "botol plastik", uang: 200 },
      { jenis: "kaca", uang: 500 },
      { jenis: "kaleng", uang: 100 },
    ];
    const sampah = jenisSampahList.find((j) => j.jenis === jenis_sampah);
    if (!sampah) {
      return res
        .status(400)
        .json({ success: false, message: "Jenis sampah tidak dikenali." });
    }
    const uangDidapat = sampah.uang;
    // Simpan hasil scan ke tabel Scan
    await pool.query(
      "INSERT INTO Scan (id, user_id, jenis_sampah, uang_didapat, created_at) VALUES ($1, $2, $3, $4, NOW())",
      [uuidv4(), userId, jenis_sampah, uangDidapat]
    );
    // Update saldo di tabel Saldo
    const cek = await pool.query("SELECT * FROM Saldo WHERE user_id = $1", [
      userId,
    ]);
    if (cek.rows.length === 0) {
      await pool.query(
        "INSERT INTO Saldo (id, user_id, saldo, updated_at) VALUES ($1, $2, $3, NOW())",
        [uuidv4(), userId, uangDidapat]
      );
    } else {
      await pool.query(
        "UPDATE Saldo SET saldo = saldo + $1, updated_at = NOW() WHERE user_id = $2",
        [uangDidapat, userId]
      );
    }
    // Tambahkan notifikasi
    const notificationMessage = `Sampah ${jenis_sampah} berhasil dipindai, saldo +Rp${uangDidapat}`;
    await pool.query(
      "INSERT INTO Notification (id, user_id, message, created_at) VALUES ($1, $2, $3, NOW())",
      [uuidv4(), userId, notificationMessage]
    );
    return res.json({
      success: true,
      jenis_sampah,
      uang_didapat: uangDidapat,
      notification: notificationMessage,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

module.exports = exports;