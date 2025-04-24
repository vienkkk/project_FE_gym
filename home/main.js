function logout() {
    let loggedIn = localStorage.getItem("loggedIn");
    if (loggedIn) {
        localStorage.setItem("loggedIn", "false"); // Set loggedIn to false
        alert("You have been logged out successfully!");
        window.location.href = "../loggin/index.html"; // Redirect to login page after logout
    } else {
        alert("You are not logged in!");
    }
}
function check_login() {
    let loggedIn = localStorage.getItem("loggedIn");
    if (loggedIn === "true") {
        console.log("User is logged in.");
    } else {
        localStorage.setItem("loggedIn", "false");
        window.location.href = "../loggin/index.html"; 
    }
}
check_login();