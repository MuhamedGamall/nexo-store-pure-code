// let mailInpt = document.querySelector(".mail");
// let passInpt = document.querySelector(".pass");
// let form = document.querySelector(".myform");
// let errorMessage = document.querySelector(".inputsFalse");
// let inputs = [...document.querySelectorAll(".inpt")];
// save data function
form.addEventListener("submit", saveData);
function saveData(Event) {
  Event.preventDefault();
  if (
    localStorage.mail == mailInpt.value.trim() &&
    localStorage.password == passInpt.value.trim()
  ) {
    errorMessage.style.display = "none";
    inputs.forEach((el) => (el.value = ""));
    setTimeout(() => {
      location.href = "/html/index.html";
    }, 250);
  } else {
    errorMessage.style.display = "block";
  }
}
