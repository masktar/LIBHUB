const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Kết nối MySQL bằng biến môi trường (Railway cung cấp)
const db = mysql.createConnection({
  host: process.env.MYSQLHOST,
  port: process.env.MYSQLPORT,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE
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
