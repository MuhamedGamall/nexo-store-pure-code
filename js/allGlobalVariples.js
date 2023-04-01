// sign in && sign up

// sign in
let mailInpt = document.querySelector(".mail");
let passInpt = document.querySelector(".pass");
let form = document.querySelector(".myform");
let errorMessage = document.querySelector(".inputsFalse");
let inputs = [...document.querySelectorAll(".inpt")];
// sign up
let mail = document.querySelector(".mail");
let username = document.querySelector(".name");
let pass = document.querySelector(".pass");

// main variaples
let overlayCart = document.querySelector(".overlayCart");
let overlayFev = document.querySelector(".overlayFev");
let overlayMegaMenu = document.querySelector(".overlayMegaMenu");
let myContent = document.querySelector(".contentGrid");
let openMenu = document.querySelector(".myCart");
let closeMenu = document.querySelector(".close");
let cartMenu = document.querySelector(".cartMenu");
let fevoriteMenu = document.querySelector(".fevoriteMenu");
let cartContent = document.querySelector(".cartMenu .content");
let countCartItemsHeader = document.querySelectorAll(".countBox .count");
let countCartItemsMenu = document.querySelector(".contItemsSpan");
let fevoriteContent = document.querySelector(".fevoriteMenu .content");
let contentCart = document.querySelector(".contentCart ");
let viewFevoriteBtn = document.querySelector(".viewFevoriteBtnt");
let countItems = document.querySelector(".countItems");
let countfevoriteItems = document.querySelector(".contfevorite");
let total = document.querySelector(".total");
let estimated = document.querySelectorAll(".estimated  span")[1];
let subtotal = document.querySelectorAll(".subtotal  span")[1];
let tax = document.querySelectorAll(".tax  span")[1];
let checkOutBtns = document.querySelectorAll(".btn");
let fevBagEmpty = document.querySelector(".fevBagEmpty");
let cartBagEmpty = document.querySelector(".cartBagEmpty");
let cartMenuBtn = document.querySelector(".cartMenu .btn");
let inputSearch = document.querySelector("#search");
let countCategory = document.querySelector(".category .count");
let searchBtn = document.querySelectorAll(".searchBtn");
let hearts = document.querySelectorAll(".heart");
let megaMenuBar = document.querySelector(".megaMenuBar");

//profile variaples
let containerPhoto = document.querySelector(".userImg ");
let myPhoto = document.querySelector(".userImg img");
let label = document.querySelector("label");
let upload = document.querySelector("#uploadFile");
let usernameProfile = document.querySelector(".username");
let emailProfile = document.querySelector(".email");
let passProfile = document.querySelector(".pass");
let editBtn = document.querySelector(".edit");
let saveBtn = document.querySelector(".save");
let inputEdit = document.querySelector(".inputEdit");
let myForm = document.querySelector(".text form");
let showPassword = document.querySelector(".myPass i");
let sortMenu = document.querySelector(".category .menu");
let icon = document.querySelector(".sortingPrice i");
let sortElement = document.querySelectorAll(".category .menu .srt");
let sortingPriceBtn = document.querySelector(".sortingPrice");
let descriptionProfile = document.querySelector(".description p");
// set arrays for localStoage and push data
let myAllData = localStorage.getItem("allData")
  ? JSON.parse(localStorage.getItem("allData"))
  : [];

let fevoriteData = localStorage.fevoriteItems
  ? JSON.parse(localStorage.getItem("fevoriteItems"))
  : [];

let myChossenProducts = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

document.addEventListener("click", (Event) => {
  if (Event.target.classList.contains("heart")) {
    Event.target.classList.toggle("on");
  }
  if (Event.target.classList.contains("on")) {
    Event.target.classList.toggle("off");
  }
});

// function decrement and increment Qut product
// document.addEventListener("click", handleDecrementAndIncrementQut);
// function handleDecrementAndIncrementQut(Event) {
//   let qutItems = document.querySelectorAll(".qut");
//   if (Event.target.classList.contains("plus")) {
//     qutItems.innerHTML++;
//   }
//   if (Event.target.classList.contains("minus")) {
//     qutItems.innerHTML--;
//   }
// }
