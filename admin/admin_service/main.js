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
check_admin();
check_login();

function updateStats() {
    countGym = 0;
    countYoga = 0;
    countZumba = 0;
    
    account.forEach((user) => {
      if (user.class_user) {
        user.class_user.forEach((item) => {
          if (item.class_gym === "Gym") countGym++;
          else if (item.class_gym === "Yoga") countYoga++;
          else if (item.class_gym === "Zumba") countZumba++;
        });
      }
    });
    
    statGym.innerHTML = countGym;
    statYoga.innerHTML = countYoga;
    statZumba.innerHTML = countZumba;
  }
  
let statGym = document.getElementsByClassName("stat-gym")[0];
let statYoga = document.getElementsByClassName("stat-yoga")[0];
let statZumba = document.getElementsByClassName("stat-zumba")[0];
let countGym = 0;
let countYoga = 0;
let countZumba = 0;
account.forEach((user) => {
  user.class_user.forEach((item) => {
    if (item.class_gym === "Gym") {
      countGym++;
    } else if (item.class_gym === "Yoga") {
      countYoga++;
    } else if (item.class_gym === "Zumba") {
      countZumba++;
    }
  });
});
statGym.innerHTML = countGym;
statYoga.innerHTML = countYoga;
statZumba.innerHTML = countZumba;

function chart() {
  let max_value = Math.max(countGym, countYoga, countZumba);
  if (max_value === 0) max_value = 1; // tránh chia cho 0

  let percentGym = (countGym / max_value) * 100;
  let percentYoga = (countYoga / max_value) * 100;
  let percentZumba = (countZumba / max_value) * 100;

  let chartGym = document.getElementsByClassName("chart-placeholder")[0];
  chartGym.innerHTML = ""; // xóa cũ

  let divGym = document.createElement("div");
  divGym.className = "bar-gym";
  divGym.style.height = percentGym + "%";
  divGym.style.width = "420px";

  let divYoga = document.createElement("div");
  divYoga.className = "bar-yoga";
  divYoga.style.height = percentYoga + "%";
  divYoga.style.width = "450px";

  let divZumba = document.createElement("div");
  divZumba.className = "bar-zumba";
  divZumba.style.height = percentZumba + "%";
  divZumba.style.width = "450px";

  chartGym.appendChild(divGym);
  chartGym.appendChild(divYoga);
  chartGym.appendChild(divZumba);
}
chart();

// Biến toàn cục cho phân trang
let currentPage = 1;
const rowsPerPage = 2; // Số dòng mỗi trang

function renderData() {
  let tableBody = document.querySelector(".data-table tbody");
  if (!tableBody) return;

  tableBody.innerHTML = "";

  let allClasses = [];
  account.forEach((user, userIndex) => {
    if (user.class_user) {
      user.class_user.forEach((classItem, classIndex) => {
        allClasses.push({
          userIndex,
          classIndex,
          user,
          classItem,
        });
      });
    }
  });

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedClasses = allClasses.slice(startIndex, endIndex);

  paginatedClasses.forEach((item, index) => {
    let row = document.createElement("tr");

    let cells = [
      item.classItem.class_gym ,
      item.classItem.date ,
      item.classItem.time ,
      item.user.username ,
      item.user.email ,
      `
        <button class="btn btn-edit" onclick="editClass(${item.userIndex}, ${item.classIndex})">Sửa</button>
        <button class="btn btn-danger" onclick="deleteClass(${item.userIndex}, ${item.classIndex})">Xóa</button>
        `,
    ];

    cells.forEach((cellContent) => {
      let cell = document.createElement("td");
      cell.innerHTML = cellContent;
      row.appendChild(cell);
    });

    tableBody.appendChild(row);
  });

  renderPagination(allClasses.length);
}

function renderPagination(totalItems) {
  const totalPages = Math.ceil(totalItems / rowsPerPage);
  let paginationContainer = document.querySelector(".pagination");

  if (!paginationContainer) {
    paginationContainer = document.createElement("div");
    paginationContainer.className = "pagination";
    document.querySelector(".main-content").appendChild(paginationContainer);
  }

  paginationContainer.innerHTML = "";

  // Previous button
  const prevBtn = document.createElement("button");
  prevBtn.innerHTML = "&laquo;";
  prevBtn.className = "page-btn";
  prevBtn.disabled = currentPage === 1;
  prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderData();
    }
  });
  paginationContainer.appendChild(prevBtn);

  // Page buttons
  for (let i = 1; i <= totalPages; i++) {
    const pageBtn = document.createElement("button");
    pageBtn.textContent = i;
    pageBtn.className = `page-btn ${i === currentPage ? "active" : ""}`;
    pageBtn.addEventListener("click", () => {
      currentPage = i;
      renderData();
    });
    paginationContainer.appendChild(pageBtn);
  }

  // Next button
  const nextBtn = document.createElement("button");
  nextBtn.innerHTML = "&raquo;";
  nextBtn.className = "page-btn";
  nextBtn.disabled = currentPage === totalPages;
  nextBtn.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      renderData();
    }
  });
  paginationContainer.appendChild(nextBtn);
}

function editClass(userIndex, classIndex) {
  if (!account[userIndex] || !account[userIndex].class_user[classIndex]) return;

  const classToEdit = account[userIndex].class_user[classIndex];
  const newClassType = prompt("Loại lớp:", classToEdit.class_gym);
  const newDate = prompt("Ngày tập:", classToEdit.date);
  const newTime = prompt("Khung giờ:", classToEdit.time);

  if (newClassType !== null && newDate !== null && newTime !== null) {
    account[userIndex].class_user[classIndex] = {
      class_gym: newClassType || classToEdit.class_gym,
      date: newDate || classToEdit.date,
      time: newTime || classToEdit.time,
    };

    localStorage.setItem("account", JSON.stringify(account));
    updateStats();
    chart();
    renderData();
  }
}

function deleteClass(userIndex, classIndex) {
  if (!account[userIndex] || !account[userIndex].class_user[classIndex]) return;

  if (confirm("Bạn chắc chắn muốn xóa lịch tập này?")) {
    account[userIndex].class_user.splice(classIndex, 1);
    localStorage.setItem("account", JSON.stringify(account));
    updateStats();
    chart();
    renderData();
  }
}

// Khởi chạy ứng dụng
function init() {
  check_admin();
  check_login();
  updateStats();
  chart();
  renderData();
}

init();
