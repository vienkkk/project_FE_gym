let account = JSON.parse(localStorage.getItem("account")) || [];
let index = localStorage.getItem("index");
let p = document.getElementById("user_name");
p.innerText = `Hello ${account[index].username}`;
function showForm() {
  const form = document.getElementById("buttonId");
  const overlay = document.getElementById("overlay");
  overlay.style.display = "flex";
  overlay.style.justifyContent = "center";
}

function inputDatabase(event) {
  event.preventDefault();
  let class_gym = document.getElementById("class").value;
  let date = document.getElementById("date").value;
  let time = document.getElementById("time").value;
  let name = document.getElementById("name").value;
  console.log(name);
  let email = document.getElementById("email").value;
  let class_user = {
    class_gym: class_gym,
    date: date,
    time: time,
    name: name,
    email: email,
  };
  account[index].class_user.push(class_user);
  localStorage.setItem("account", JSON.stringify(account));
  renderData(account[index].class_user);
  event.preventDefault();
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
function i_step(i){
  currPage=i
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

function renderData(arr) {
  const tbody = document.querySelector("tbody");
  tbody.innerHTML = "";
  arr.forEach((el, index) => {
    let tr = document.createElement("tr");
    tr.innerHTML = `
    <td>${el.class_gym}</td>
    <td>${el.date}</td>
    <td>${el.time}</td>
    <td>${el.name}</td>
    <td>${el.email}</td>
    <button id ="edit_">Sửa</button>
    <button id ="delete_">Xóa</button>
    `;
    tbody.appendChild(tr);
  });
}
