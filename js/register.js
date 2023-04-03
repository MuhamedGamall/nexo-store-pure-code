// let mail = document.querySelector(".mail");
// let username = document.querySelector(".name");
// let pass = document.querySelector(".pass");
// let form = document.querySelector(".myform");
// let inputs = [...document.querySelectorAll(".inpt")];
// save data function
form.addEventListener("submit", saveData);

function saveData(Event) {
  Event.preventDefault();
  localStorage.setItem("password", pass.value.trim());
  localStorage.setItem("username", username.value.trim());
  localStorage.setItem("mail", mail.value.trim());
  inputs.forEach((el) => (el.value = ""));
  location.href = "../html/login.html";
}
