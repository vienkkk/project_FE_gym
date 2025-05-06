let selectedServiceIndex = null;
let isEditing = false;

function renderData() {
    const services = JSON.parse(localStorage.getItem("services")) || [];
    const tbody = document.querySelector(".service-table tbody");
    tbody.innerHTML = "";
  
    services.forEach((service, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${service.name}</td>
        <td>${service.description}</td>
        <td><img src="${service.image || 'https://via.placeholder.com/50'}" width="50" height="50" alt="${service.name}"></td>
        <td><button class="edit-btn" data-index="${index}">Sửa</button></td>
        <td><button class="delete-btn" data-index="${index}">Xóa</button></td>
      `;
      tbody.appendChild(row);
    });
  
    // Phần còn lại giữ nguyên
    document.querySelectorAll(".edit-btn").forEach(btn =>
      btn.addEventListener("click", openEditModal)
    );
    document.querySelectorAll(".delete-btn").forEach(btn =>
      btn.addEventListener("click", openDeleteModal)
    );
  }

function openAddModal() {
  isEditing = false;
  selectedServiceIndex = null;
  document.querySelector(".modal-title").innerText = "Thêm dịch vụ mới";
  document.getElementById("serviceName").value = "";
  document.getElementById("serviceDesc").value = "";
  document.getElementById("serviceImage").value = "";
  document.querySelector(".service-modal").classList.remove("hidden");
}

function openEditModal(e) {
  isEditing = true;
  selectedServiceIndex = e.target.getAttribute("data-index");
  const services = JSON.parse(localStorage.getItem("services")) || [];
  const service = services[selectedServiceIndex];

  document.querySelector(".modal-title").innerText = "Sửa dịch vụ";
  document.getElementById("serviceName").value = service.name;
  document.getElementById("serviceDesc").value = service.description;
  document.getElementById("serviceImage").value = service.image || "";

  document.querySelector(".service-modal").classList.remove("hidden");
}

function saveService() {
  const name = document.getElementById("serviceName").value.trim();
  const description = document.getElementById("serviceDesc").value.trim();
  const image = document.getElementById("serviceImage").value.trim();

  if (!name || !description) {
    alert("Vui lòng điền đầy đủ thông tin!");
    return;
  }

  const services = JSON.parse(localStorage.getItem("services")) || [];

  if (isEditing) {
    services[selectedServiceIndex] = { name, description, image };
  } else {
    services.push({ name, description, image });
  }

  localStorage.setItem("services", JSON.stringify(services));
  document.querySelector(".service-modal").classList.add("hidden");
  renderData();
}

function openDeleteModal(e) {
  selectedServiceIndex = e.target.getAttribute("data-index");
  document.querySelector(".confirm-modal").classList.remove("hidden");
}

function confirmDelete() {
  const services = JSON.parse(localStorage.getItem("services")) || [];
  services.splice(selectedServiceIndex, 1);
  localStorage.setItem("services", JSON.stringify(services));
  document.querySelector(".confirm-modal").classList.add("hidden");
  renderData();
}

function closeModals() {
  document.querySelectorAll(".modal").forEach(modal => modal.classList.add("hidden"));
}

document.querySelector(".add-btn").addEventListener("click", openAddModal);
document.getElementById("saveServiceBtn").addEventListener("click", saveService);
document.getElementById("confirmDelete").addEventListener("click", confirmDelete);
document.querySelectorAll(".close-modal").forEach(btn =>
  btn.addEventListener("click", closeModals)
);
function logout() {
  let loggedIn = localStorage.getItem("loggedIn");
  if (loggedIn) {
      localStorage.setItem("loggedIn", "false"); 
      alert("You have been logged out successfully!");
      window.location.href = "/loggin/index.html"; 
  } else {
      alert("You are not logged in!");
  }
}
// Khởi tạo dữ liệu ban đầu
renderData();