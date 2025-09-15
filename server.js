const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");

const app = express();

// đọc dữ liệu form POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); // nơi chứa index.html, style.css

// kết nối MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",     // user MySQL của bạn
  password: "Manhtan0209@",     // mật khẩu MySQL
  database: "libhub"
});

db.connect(err => {
  if (err) throw err;
  console.log("✅ Đã kết nối MySQL");
});

// xử lý form login
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
  db.query(sql, [email, password], (err, results) => {
    if (err) throw err;

    if (results.length > 0) {
      res.send("✅ Đăng nhập thành công!");
    } else {
      res.send("❌ Sai email hoặc mật khẩu!");
    }
  });
});

// chạy server
app.listen(3000, () => {
  console.log("🚀 Server chạy tại http://localhost:3000");
});
