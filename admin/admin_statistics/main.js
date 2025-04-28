let account = JSON.parse(localStorage.getItem("account")) || [];
let index = localStorage.getItem("index")

function check_admin(){
    if(account[index].status!=="admin"){
        window.location.href = "/home/index.html"; 
    }
}

function check_login() {
    let loggedIn = localStorage.getItem("loggedIn");
    if (loggedIn === "false") {
        localStorage.setItem("loggedIn", "false");
        window.location.href = "/loggin/index.html"; 
    }
}

check_admin()
check_login();