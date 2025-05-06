// Dữ liệu và trạng thái
let account = JSON.parse(localStorage.getItem("account")) || [];
let index = localStorage.getItem("index");
let currentEditUserIndex = null;
let currentEditClassIndex = null;
let isEditing = false;

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

function updateStats() {
  let countGym = 0, countYoga = 0, countZumba = 0;

  account.forEach(user => {
    if (user.class_user) {
      user.class_user.forEach(item => {
        if (item.class_gym === "Gym") countGym++;
        else if (item.class_gym === "Yoga") countYoga++;
        else if (item.class_gym === "Zumba") countZumba++;
      });
    }
  });

  document.querySelector(".stat-gym").innerHTML = countGym;
  document.querySelector(".stat-yoga").innerHTML = countYoga;
  document.querySelector(".stat-zumba").innerHTML = countZumba;
}

function showForm() {
  document.getElementById("overlay").style.display = "flex";
  document.getElementById("buttonId").reset();
  document.getElementById("change").innerText = "Lưu";
  isEditing = false;
}

function hide_form(event) {
  if (event) event.preventDefault();
  document.getElementById("overlay").style.display = "none";
  isEditing = false;
}

function chart() {
  let countGym = parseInt(document.querySelector(".stat-gym").textContent) || 0;
  let countYoga = parseInt(document.querySelector(".stat-yoga").textContent) || 0;
  let countZumba = parseInt(document.querySelector(".stat-zumba").textContent) || 0;

  let max_value = Math.max(countGym, countYoga, countZumba) || 1;

  let chartGym = document.querySelector(".chart-placeholder");
  chartGym.innerHTML = "";

  [
    { className: "bar-gym", height: (countGym / max_value) * 100 },
    { className: "bar-yoga", height: (countYoga / max_value) * 100 },
    { className: "bar-zumba", height: (countZumba / max_value) * 100 }
  ].forEach(bar => {
    let div = document.createElement("div");
    div.className = bar.className;
    div.style.width = "450px";
    div.style.height = bar.height + "%";
    chartGym.appendChild(div);
  });
}

let currentPage = 1;
const rowsPerPage = 2;

function getFilteredClasses() {
  const classFilter = document.getElementById("classFilter").value.trim();
  const emailFilter = document.getElementById("emailFilter").value.toLowerCase().trim();
  const dateFilter = document.getElementById("dateFilter").value;

  let filtered = [];

  account.forEach((user, userIndex) => {
    if (user.class_user) {
      user.class_user.forEach((classItem, classIndex) => {
        const matchClass = classFilter === "Tất cả" || classItem.class_gym === classFilter;
        const matchEmail = user.email.toLowerCase().includes(emailFilter);
        const matchDate = dateFilter === "" || classItem.date === dateFilter;

        if (matchClass && matchEmail && matchDate) {
          filtered.push({ userIndex, classIndex, user, classItem });
        }
      });
    }
  });

  return filtered;
}

function renderData() {
  const tableBody = document.querySelector(".data-table tbody");
  if (!tableBody) return;

  tableBody.innerHTML = "";

  const allClasses = getFilteredClasses();
  const paginated = allClasses.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  paginated.forEach(({ userIndex, classIndex, user, classItem }) => {
    const row = document.createElement("tr");

    [classItem.class_gym, classItem.date, classItem.time, user.username, user.email,
      `<button class="btn btn-edit" onclick="editClass(${userIndex}, ${classIndex})">Sửa</button>
       <button class="btn btn-danger" onclick="deleteClass(${userIndex}, ${classIndex})">Xóa</button>`
    ].forEach(content => {
      const cell = document.createElement("td");
      cell.innerHTML = content;
      row.appendChild(cell);
    });

    tableBody.appendChild(row);
  });

  renderPagination(allClasses.length);
}

function renderPagination(totalItems) {
  const totalPages = Math.ceil(totalItems / rowsPerPage);
  const container = document.querySelector(".pagination") || document.createElement("div");

  if (!container.classList.contains("pagination")) {
    container.className = "pagination";
    document.querySelector(".main-content").appendChild(container);
  }

  container.innerHTML = "";

  const createPageBtn = (label, disabled, onClick) => {
    const btn = document.createElement("button");
    btn.innerHTML = label;
    btn.className = "page-btn";
    btn.disabled = disabled;
    btn.addEventListener("click", onClick);
    return btn;
  };

  container.appendChild(createPageBtn("&laquo;", currentPage === 1, () => { currentPage--; renderData(); }));

  for (let i = 1; i <= totalPages; i++) {
    const btn = createPageBtn(i, false, () => { currentPage = i; renderData(); });
    if (i === currentPage) btn.classList.add("active");
    container.appendChild(btn);
  }

  container.appendChild(createPageBtn("&raquo;", currentPage === totalPages, () => { currentPage++; renderData(); }));
}

function editClass(userIndex, classIndex) {
  const classToEdit = account[userIndex]?.class_user[classIndex];
  if (!classToEdit) return;

  currentEditUserIndex = userIndex;
  currentEditClassIndex = classIndex;
  isEditing = true;

  document.getElementById("overlay").style.display = "flex";
  document.getElementById("class").value = classToEdit.class_gym;
  document.getElementById("date").value = classToEdit.date;
  document.getElementById("time").value = classToEdit.time;
  document.getElementById("name").value = account[userIndex].username;
  document.getElementById("email").value = account[userIndex].email;
  document.getElementById("change").innerText = "Cập nhật";
}

function deleteClass(userIndex, classIndex) {
  if (!account[userIndex]?.class_user[classIndex]) return;
  if (confirm("Bạn chắc chắn muốn xóa lịch tập này?")) {
    account[userIndex].class_user.splice(classIndex, 1);
    localStorage.setItem("account", JSON.stringify(account));
    updateStats();
    chart();
    renderData();
  }
}

function inputDatabase(event) {
  event.preventDefault();

  const classValue = document.getElementById("class").value;
  const dateValue = document.getElementById("date").value;
  const timeValue = document.getElementById("time").value;
  const nameValue = document.getElementById("name").value;
  const emailValue = document.getElementById("email").value;

  if (isEditing) {
    let edited = account[currentEditUserIndex];
    edited.class_user[currentEditClassIndex] = { class_gym: classValue, date: dateValue, time: timeValue };
    edited.username = nameValue;
    edited.email = emailValue;
    isEditing = false;
  }

  localStorage.setItem("account", JSON.stringify(account));
  hide_form();
  updateStats();
  chart();
  renderData();
}

// Gắn sự kiện lọc
["classFilter", "emailFilter", "dateFilter"].forEach(id => {
  document.getElementById(id).addEventListener("input", () => {
    currentPage = 1;
    renderData();
  });
});
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

function init() {
  check_admin();
  check_login();
  updateStats();
  chart();
  renderData();
}

init();
