const msgBox = document.getElementById("message");

document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res = await fetch("https://libhub-production.up.railway.app/login", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
    });

    const text = await res.text();

    // reset trạng thái
    msgBox.style.display = "block";
    msgBox.className = "";
    msgBox.innerText = text.replace(/^[^a-zA-ZÀ-ỹ0-9]+/, ""); // bỏ ký tự đặc biệt đầu chuỗi

    if (text.includes("thành công")) {
        msgBox.classList.add("success");
    } else {
        msgBox.classList.add("error");
    }

    // reset animation trước khi add class "show"
    msgBox.classList.remove("show");
    void msgBox.offsetWidth; // trick reset animation
    msgBox.classList.add("show");

    // Ẩn sau 5 giây
    setTimeout(() => {
        msgBox.classList.remove("show");
        msgBox.classList.add("hide");

        msgBox.addEventListener("animationend", () => {
            msgBox.style.display = "none";
            msgBox.classList.remove("hide");
        }, { once: true });
    }, 5000);
});
