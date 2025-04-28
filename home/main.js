let account = JSON.parse(localStorage.getItem("account")) || [];
let index = localStorage.getItem("index")
function logout() {
    let loggedIn = localStorage.getItem("loggedIn");
    if (loggedIn) {
        localStorage.setItem("loggedIn", "false"); 
        alert("You have been logged out successfully!");
        window.location.href = "../loggin/index.html"; 
    } else {
        alert("You are not logged in!");
    }
}
let p = document.getElementById("name")
let navLinks = document.getElementsByClassName("navLinks")
function check_login() {
    let loggedIn = localStorage.getItem("loggedIn");
    if (loggedIn === "true") {
        console.log("User is logged in.");
        p.innerText=`Hello ${account[index].username}`
        if (account[index].status=="admin"){
            let remote_admin = document.createElement("p")
            remote_admin.innerText="Quản lí Admin"   
            navLinks[0].appendChild(remote_admin);
            remote_admin.addEventListener("click",()=>{
                window.location.href = "../admin/admin_statistics/index.html"
            })
        }
        if(account[index].status=="user"){
            let booked = document.createElement("p")
            booked.innerText="Lịch đã đặt"
            navLinks[0].appendChild(booked);
            booked.addEventListener("click",()=>{
                window.location.href = "../booking page/index.html"
            })
        }
    } else {
        localStorage.setItem("loggedIn", "false");
        window.location.href = "../loggin/index.html"; 
    }
}
check_login();