const express = require("express");
const mysql = require("mysql2");

require("dotenv").config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Kết nối MySQL bằng biến môi trường (Railway cung cấp)
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect(err => {
  if (err) {
    console.error("❌ MySQL connection error:", err);
    return;
  }
  console.log("✅ Connected to Railway MySQL");
});


// API login
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
  db.query(sql, [email, password], (err, results) => {
    if (err) return res.status(500).send("Database error");

    if (results.length > 0) {
      res.send("Đăng nhập thành công");
    } else {
      res.send("Sai email hoặc mật khẩu");
    }
  });
});

// Server listen
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
