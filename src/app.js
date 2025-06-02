const express = require("express");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRouter");
const scanRoutes = require("./routes/scanRouter");
const saldoRoutes = require("./routes/saldoRouter");
const notificationRoutes = require("./routes/notificationRouter");
const historyRoutes = require("./routes/historyRouter");
const pool = require("./utils/db");

     // Load environment variables
     dotenv.config();

     const app = express();
     const PORT = process.env.PORT || 9000;

     app.use(express.json());

     // Test database connection
     app.get("/test-db", async (req, res) => {
       try {
         const result = await pool.query('SELECT NOW()');
         res.json({ success: true, time: result.rows[0].now });
       } catch (error) {
         console.error("Test DB error:", error.message, error.stack);
         res.status(500).json({ error: error.message });
       }
     });

     // Routes
     app.use("/auth", authRoutes);
     app.use("/scan", scanRoutes);
     app.use("/saldo", saldoRoutes);
     app.use("/notifications", notificationRoutes);
     app.use("/history", historyRoutes);

     // Root endpoint
     app.get("/", (req, res) => {
       res.send("Trashure Backend API");
     });

     // 404 handler
     app.use((req, res) => {
       res.status(404).json({ message: "Endpoint not found" });
     });

     app.listen(PORT, () => {
       console.log(`Server running on port ${PORT}`);
     });
     