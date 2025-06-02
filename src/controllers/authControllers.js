const pool = require("../utils/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  // Register pengguna baru
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      // Validasi input
      if (!name || !email || !password) {
        return res
          .status(400)
          .json({ error: "Name, email, and password are required" });
      }

      // Validasi format email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Invalid email format" });
      }

      // Cek apakah email sudah terdaftar
      const checkEmailQuery = 'SELECT 1 FROM "User" WHERE email = $1';
      const emailCheck = await pool.query(checkEmailQuery, [email]);
      if (emailCheck.rows.length > 0) {
        return res.status(400).json({ error: "Email already registered" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      const id = uuidv4();
      const now = new Date();

      // Simpan pengguna ke database
      const insertQuery =
        'INSERT INTO "User" (id, name, email, password, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, name, email';
      const values = [id, name, email, hashedPassword, now, now];
      const result = await pool.query(insertQuery, values);
      const user = result.rows[0];

      // Generate JWT token
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.status(201).json({ ...user, token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Login pengguna
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const selectQuery = 'SELECT * FROM "User" WHERE email = $1';
      const result = await pool.query(selectQuery, [email]);
      const user = result.rows[0];
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      // Generate JWT token
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};