let account = JSON.parse(localStorage.getItem("account")) || [];

// Kiểm tra xem đã có tài khoản admin chưa
const isAdminExists = account.some(
  (acc) => acc.username === "admin" || acc.email === "admin@gmail.com"
);

if (!isAdminExists) {
  account.push({
    username: "admin",
    email: "admin@gmail.com",
    password: "admin123",
    status: "admin",
  });

  localStorage.setItem("account", JSON.stringify(account));
}
// Cập nhật dữ liệu vào localStorage
function check_login2() {
  let loggedIn = localStorage.getItem("loggedIn");
  if (loggedIn === "true") {
    alert("You are already logged in!");
    window.location.href = "../home/index.html"; // Redirect to booking page if already logged in
  } else {
    localStorage.setItem("loggedIn", "false");
  }
}

check_login2();

function check_login(event) {
    event.preventDefault();
  
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let account = JSON.parse(localStorage.getItem("account") || "[]");
  
    let userIndex = account.findIndex(
      (user) => user.email === email && user.password === password
    );
  
    // Lưu lại index để dùng về sau
    localStorage.setItem("index", userIndex);
  
    if (userIndex !== -1) {
      let user = account[userIndex];
  
      alert("Login successful!");
      localStorage.setItem("loggedIn", "true");
  
      // Điều hướng theo loại tài khoản
      if (user.status === "admin") {
        window.location.href = "../home/index.html";
      } else if (user.status === "user") {
        window.location.href = "../home/index.html";
      } else {
        window.location.href = "../home/index.html";
      }
    } else {
      alert("Invalid email or password. Please try again.");
    }
  }
  