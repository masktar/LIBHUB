// --- Hiển thị thông báo ---
const msgBox = document.getElementById("message");

document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("https://libhub-production.up.railway.app/login", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
    });

    const text = await res.text();

    msgBox.style.display = "block";
    msgBox.className = "";
    msgBox.innerText = text.replace(/^[^a-zA-ZÀ-ỹ0-9]+/, "");

    if (text.includes("thành công")) {
      msgBox.classList.add("success");
    } else {
      msgBox.classList.add("error");
    }

    msgBox.classList.remove("show");
    void msgBox.offsetWidth;
    msgBox.classList.add("show");

    setTimeout(() => {
      msgBox.classList.remove("show");
      msgBox.classList.add("hide");

      msgBox.addEventListener("animationend", () => {
        msgBox.style.display = "none";
        msgBox.classList.remove("hide");
      }, { once: true });
    }, 5000);
  } catch (err) {
    msgBox.style.display = "block";
    msgBox.className = "";
    msgBox.innerText = "Không thể kết nối tới server.";
    msgBox.classList.add("error");
    msgBox.classList.remove("show");
    void msgBox.offsetWidth;
    msgBox.classList.add("show");
  }
});

// --- Toggle show/hide password ---
const toggleImg = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');

if (toggleImg && passwordInput) {
  const EYE_OFF = 'eye1.png'; // icon mắt đóng
  const EYE_ON  = 'eye2.png'; // icon mắt mở

  function togglePasswordVisibility() {
    if (passwordInput.classList.contains("hidden")) {
      passwordInput.classList.remove("hidden"); // hiện mật khẩu
      toggleImg.src = EYE_ON;
      toggleImg.alt = 'Ẩn mật khẩu';
    } else {
      passwordInput.classList.add("hidden"); // ẩn mật khẩu
      toggleImg.src = EYE_OFF;
      toggleImg.alt = 'Hiện mật khẩu';
    }
    passwordInput.focus();
  }

  toggleImg.addEventListener('mousedown', (e) => e.preventDefault());
  toggleImg.addEventListener('click', (e) => {
    e.preventDefault();
    togglePasswordVisibility();
  });
}

function togglePasswordVisibility() {
  toggleImg.style.opacity = "0"; // bắt đầu fade out
  setTimeout(() => {
    if (passwordInput.classList.contains("hidden")) {
      passwordInput.classList.remove("hidden");
      toggleImg.src = EYE_ON;
      toggleImg.alt = 'Ẩn mật khẩu';
    } else {
      passwordInput.classList.add("hidden");
      toggleImg.src = EYE_OFF;
      toggleImg.alt = 'Hiện mật khẩu';
    }
    toggleImg.style.opacity = "1"; // fade in lại
  }, 150); // delay = nửa thời gian transition
}
