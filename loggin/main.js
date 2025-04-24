let account = JSON.parse(localStorage.getItem("account")) || [];

// Kiểm tra xem đã có tài khoản admin chưa
const isAdminExists = account.some(acc => acc.username === "admin" || acc.email === "admin@gmail.com");

if (!isAdminExists) {
    account.push({
        username: "admin",
        email: "admin@gmail.com",
        password: "admin123",
        status: "admin"
    });

    localStorage.setItem("account", JSON.stringify(account));
}
 // Cập nhật dữ liệu vào localStorage
function check_login2() {
    let loggedIn = localStorage.getItem("loggedIn");
    if (loggedIn === "true") {
        alert("You are already logged in!");
        window.location.href = "../home/index.html";
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

    let user = account.find(user => user.email === email && user.password === password);

    if (user) {
        alert("Login successful!");
        localStorage.setItem("loggedIn", "true"); 
        window.location.href = "../home/index.html";
        if(user.status === "admin") {
            window.location.href = "../admin/index.html"; // Redirect to admin page if user is admin
        }
        else if(user.status === "user") {
            window.location.href = "../home/index.html"; // Redirect to user page if user is a regular user
        }
    } else {
        alert("Invalid email or password. Please try again.");
    }
}
function check_admin(){

}