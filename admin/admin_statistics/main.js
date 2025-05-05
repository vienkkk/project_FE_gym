let account = JSON.parse(localStorage.getItem("account")) || [];
let index = localStorage.getItem("index");

function check_admin() {
    if (account[index].status !== "admin") {
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

if (!localStorage.getItem("services")) {
    localStorage.setItem("services", JSON.stringify(services));
}

function change_content(content){
    if(content === "Gym"){
        return "Tập luyện với các thiết bị hiện đại";
    }
    if(content === "Yoga"){
        return "Thư giãn và cân bằng tâm tri";
    }
    if(content === "Zumba"){
        return "Đốt cháy calories với những điệu nhảy sôi động";

    }
}

function renderData() {
    const services = JSON.parse(localStorage.getItem("services")) || [];
    const tbody = document.querySelector(".service-table tbody");
    
    tbody.innerHTML = ""; 
    
    services.forEach((service, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${service.name}</td>
            <td>${change_content(service.name)}</td>
            <td><img src="${service.name}.jpg" width="50"></td>
            <td>
                <button class="edit-btn" data-index="${index}">Sửa</button>
            </td>
            <td>
                <button class="delete-btn" data-index="${index}">Xóa</button>
            </td>
        `;
        
        tbody.appendChild(row);
    });
    
    document.querySelectorAll(".edit-btn").forEach(btn => {
        btn.addEventListener("click", editService);
    });
    
    document.querySelectorAll(".delete-btn").forEach(btn => {
        btn.addEventListener("click", deleteService);
    });
}

function addNewService() {
    const name = prompt("Nhập tên dịch vụ:");
    if (!name) return;
    
    const description = prompt("Nhập mô tả dịch vụ:");
    const image = prompt("Nhập URL hình ảnh (nếu có):");
    
    const services = JSON.parse(localStorage.getItem("services")) || [];
    services.push({
        name,
        description: description || "",
        image: image || ""
    });
    
    localStorage.setItem("services", JSON.stringify(services));
    renderData();
}

function editService(e) {
    const index = e.target.getAttribute("data-index");
    const services = JSON.parse(localStorage.getItem("services"));
    const service = services[index];
    
    const name = prompt("Nhập tên dịch vụ:", service.name);
    if (name === null) return;
    
    const description = prompt("Nhập mô tả dịch vụ:", service.description);
    
    services[index] = {
        name: name || service.name,
        description: description || service.description,
        image: image || service.image
    };
    
    localStorage.setItem("services", JSON.stringify(services));
    renderData();
}

function deleteService(e) {
    const index = e.target.getAttribute("data-index");
    if (confirm("Bạn có chắc chắn muốn xóa dịch vụ này?")) {
        const services = JSON.parse(localStorage.getItem("services"));
        services.splice(index, 1);
        localStorage.setItem("services", JSON.stringify(services));
        renderData();
    }
}

function init() {
    check_admin();
    check_login();
    renderData();
    document.querySelector(".add-btn").addEventListener("click", addNewService);
}

init();