document.getElementById("loginForm").addEventListener("submit", async function(e) {
    e.preventDefault(); // chặn submit mặc định

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Gửi dữ liệu đến server
    const res = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
    });

    const text = await res.text();

    const msgBox = document.getElementById("message");
    msgBox.innerText = text;

    // Thêm màu cho thông báo
    if (text.includes("thành công")) {
        msgBox.style.color = "green";
    } else {
        msgBox.style.color = "red";
    }
});
