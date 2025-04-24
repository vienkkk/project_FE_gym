let form = document.querySelector("form");
let overlay = document.getElementById("overlay");
function showForm() {
  const form = document.getElementById("form-id"); // Thay bằng ID thực tế
  const overlay = document.getElementById("overlay-id");

  form.style.display = "block"; // Hiển thị form
  overlay.style.display = "block"; // Hiển thị nền mờ

  // Thiết lập overlay
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100vw";
  overlay.style.height = "100vh";
  overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)"; // Hiệu ứng nền xám mờ
  overlay.style.display = "flex";
  overlay.style.justifyContent = "center";
  overlay.style.alignItems = "center";
  overlay.style.zIndex = "999";
}
function test(event) {
  event.preventDefault(); // Prevent the default form submission behavior
  form.style.display = "none";
} // Hide the form
function test2(event) {
  event.preventDefault(); // Prevent the default form submission behavior
  form.style.display = "none";
}
