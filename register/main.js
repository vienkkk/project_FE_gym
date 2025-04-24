let account = JSON.parse(localStorage.getItem("account") || "[]");
function save_local(){
    localStorage.setItem("account", JSON.stringify(account));
}
save_local();

function check_register(event){
    event.preventDefault();
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let password2 = document.getElementById("confirm-password").value;
    if(password==password2){
        if(password.length==8){
            let user={
                username: username,
                email: email,
                password: password,
                status: "user",
            }
            account.push(user);
            save_local();
            alert("Register success!");
            window.location.href = "../home/index.html";
        }
        else{
            alert("Password must be 8 characters long!");
        }
    }
    else{
        alert("Password and confirm password do not match!");
    }
}