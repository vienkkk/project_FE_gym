let account = JSON.parse(localStorage.getItem("account")) || [];
let index = localStorage.getItem("index");
let p = document.getElementById("user_name");
p.innerText = `Hello ${account[index].username}`;
function showForm() {
  const overlay = document.getElementById("overlay");
  overlay.style.display = "flex";
  overlay.style.justifyContent = "center";
  overlay.style.zIndex="999"
}

let find = false;

function inputDatabase(event) {
  event.preventDefault();
  let class_gym = document.getElementById("class").value.trim()
  let date = document.getElementById("date").value.trim()
  let time = document.getElementById("time").value.trim()
  let name = document.getElementById("name").value.trim()
  let email = document.getElementById("email").value.trim()
  
  let class_user = {
    class_gym: class_gym,
    date: date,
    time: time,
    name: name,
    email: email,
  };
  
  if (find) {
    account[index].class_user[index_class] = class_user;
  } else {
    if (class_gym === "" || date === "" || time === "" || name === "" || email === "") {
      alert("Dữ liệu không được bỏ trống, hãy nhập cho đầy đủ!");
      return;
    }
    if (account[index].class_user.some(user => user.email === email || (user.name === name && user.time === time))) {
      alert("Email hoặc tên với khung giờ này đã tồn tại. Vui lòng kiểm tra lại!");
      return;
    }
    account[index].class_user.push(class_user);
  }

  localStorage.setItem("account", JSON.stringify(account));
  renderData(account[index].class_user);
  document.getElementById("overlay").style.display = "none";
  
}

function hide_form(event) {
  event.preventDefault();
  document.getElementById("overlay").style.display = "none";
}

let currPage = 1;
let perPage = 4;
let totalPage = Math.ceil(account[index].class_user.length / perPage);
function pagin() {
  let newArr = account[index].class_user.slice(
    (currPage - 1) * perPage,
    (currPage - 1) * perPage + perPage
  );
  renderData(newArr);
  btn();
}
function i_step(i) {
  currPage = i;
  pagin();
  btn();
}
function btn() {
  let footer = document.querySelector("footer");
  footer.innerHTML = "";
  for (let i = 1; i <= totalPage; i++) {
    footer.innerHTML += `<button onclick="i_step(${i})">${i}</button>`;
  }
}
pagin();

function showDeleteModal() {
  document.getElementById("modal_overlay").style.display = "flex";
}

function hideDelete() {
  document.getElementById("modal_overlay").style.display = "none";
}

function delete_index(realIndex) {
  if (confirm("Bạn có muốn xóa ?")) {
    account[index].class_user.splice(realIndex, 1);
    localStorage.setItem("account", JSON.stringify(account));
    totalPage = Math.ceil(account[index].class_user.length / perPage);
    if (currPage > totalPage) currPage = totalPage;
    pagin();
    hideDelete();
  }
}
let index_class;
function editEl(i) {
  showForm();
  document.getElementById("class").value = account[index].class_user[i].class_gym;
  document.getElementById("date").value = account[index].class_user[i].date;
  document.getElementById("time").value = account[index].class_user[i].time;
  document.getElementById("name").value = account[index].class_user[i].name;
  document.getElementById("email").value = account[index].class_user[i].email;

  find = true;
  index_class = i;

  document.getElementById("change").innerText = "Lưu chỉnh sửa";
}


function renderData(arr) {
  const tbody = document.querySelector("tbody");
  tbody.innerHTML = "";
  arr.forEach((el, i) => {
    let tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${el.class_gym}</td>
      <td>${el.date}</td>
      <td>${el.time}</td>
      <td>${el.name}</td>
      <td>${el.email}</td>
      <td>
        <button onclick="editEl(${i})" id="edit_">Sửa</button>
        <button onclick="showDeleteModal(${i})" id="delete_">Xóa</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}
