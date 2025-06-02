const pool = require("../utils/db");
const { v4: uuidv4 } = require("uuid");

exports.getNotifications = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { page = 1, limit = 10 } = req.query; // Pagination
    const offset = (page - 1) * limit;
    const result = await pool.query(
      "SELECT id, message, created_at, is_read FROM Notification WHERE user_id = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3",
      [userId, limit, offset]
    );
    const totalResult = await pool.query(
      "SELECT COUNT(*) FROM Notification WHERE user_id = $1",
      [userId]
    );
    const totalItems = parseInt(totalResult.rows[0].count);
    res.json({
      success: true,
      notifications: result.rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        totalItems,
        totalPages: Math.ceil(totalItems / limit),
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error." });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const { notificationId } = req.body;
    const userId = req.user.userId;
    const result = await pool.query(
      "UPDATE Notification SET is_read = TRUE WHERE id = $1 AND user_id = $2 RETURNING id",
      [notificationId, userId]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ success: false, message: "Notifikasi tidak ditemukan." });
    }
    res.json({ success: true, message: "Notifikasi ditandai sebagai dibaca." });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error." });
  }
};

module.exports = exports;