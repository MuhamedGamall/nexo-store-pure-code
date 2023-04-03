let logOutBtn = document.querySelector(".logOut");
let userBox = document.querySelector("#userBox");
let links = document.querySelector("#links");
let linksMenu = document.querySelector(".linksMenu");
let navMobileLinks = document.querySelectorAll(".navMobileLink");

function user() {
  if (localStorage.username) {
    links.style.display = "none";
    userBox.style.display = "flex";
    navMobileLinks.forEach((el) => (el.style.display = "block"));
  } else {
    links.style.display = "flex";
    linksMenu.style.display = "flex";
    userBox.style.display = "none";
    navMobileLinks.forEach((el) => (el.style.display = "none"));
  }
}
user();

function logOut() {
  logOutBtn.onclick = () => {
    links.style.display = "flex";
    userBox.style.display = "none";
    navMobileLinks.forEach((el) => (el.style.display = "none"));
    localStorage.clear();
    location.href = "../html/register.html";
  };
}
logOut();
