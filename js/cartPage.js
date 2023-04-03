// function close And Open Cart Menu
document.addEventListener("click", closeAndOpenMenu);
function closeAndOpenMenu(Event) {
  if (Event.target.classList.contains("myfevorite")) {
    fevoriteMenu.classList.add("open");
    fevoriteMenu.classList.remove("remove");
    document.body.style.cssText = "overflow: hidden;";
    overlayFev.style.display = "block";
  }
  if (Event.target.classList.contains("close")) {
    fevoriteMenu.classList.remove("open");
    fevoriteMenu.classList.add("remove");
    document.body.style.cssText = "overflow: visible;";
    overlayFev.style.display = "none";
  }
}

function emptyMenusAction() {
  setTimeout(() => {
    fevBagEmpty.style.display = fevoriteData.length == 0 ? "flex" : "none";
  }, 300);
  if (fevoriteData.length == 0) {
    fevoriteMenu.classList.remove("add");
    fevoriteMenu.classList.add("remove");
    document.body.style.cssText = "overflow: visible;";
    overlayFev.style.display = "none";
  }
}
emptyMenusAction();
// function draw Cart Menu
function drawCartPage(Data) {
  let myItems = Data.map((el, i) => {
    return `
		<div class="item"  data-aos='fade-left'>
		<div class="image">
    <img src="../${el.image_url}" alt="" />
		</div>
		<div class="plusOrMinus">
    <i class="fa-solid fa-plus plus" onclick='incrementCount(${i})'></i>
    <span>${el.count}</span>
    <i class="fa-solid fa-minus minus" onclick='decrementCount(${i})'></i>
		</div>
		<div class="description">
    <div class="price">
    <p class="rate"><i class="fa-solid fa-star"></i>${el.rate}</p>
    <h5>$${el.price}</h5>
    </div>
    <h4>${el.brand}</h4>
    <p class="info">${el.description.split(" ").slice(0, 9).join(" ")}</p>
    <div class="actionBtns">
    <i class="fa-regular fa-eye" onclick='showDetails(${el.id})'></i>
    <i class="fa-regular fa-heart heart ${
      el.fevorite == "true" ? "on" : "off"
    }" onclick ='addToFevorite(${el.id})'></i>
    <i class="fa-regular fa-trash-can" onclick= 'removeItem(${i})'></i>
			</div>
      </div>
      </div>
    `;
  });
  contentCart.innerHTML = myItems.join("");
}
drawCartPage(myChossenProducts);
// function add to fevorite
function addToFevorite(item) {
  let chossenItem = myAllData.find((el) => el.id == item);
  let check = fevoriteData.some((el) => el.id == item);
  if (!check) {
    fevoriteData.push(chossenItem);
  }
  myAllData.forEach((el) => {
    if (el.id == item) {
      if (el.fevorite == "false") {
        el.fevorite = "true";
      } else {
        el.fevorite = "false";
        fevoriteData = fevoriteData.filter((el) => el.id !== item);
      }
    }
  });
  myChossenProducts.forEach((el) => {
    if (el.id == item) {
      if (el.fevorite == "false") {
        el.fevorite = "true";
      } else {
        el.fevorite = "false";
        fevoriteData = fevoriteData.filter((el) => el.id !== item);
      }
    }
  });
  fevoriteData = myAllData.filter((el) => el.fevorite == "true");
  localStorage.setItem("fevoriteItems", JSON.stringify(fevoriteData));
  localStorage.setItem("cartItems", JSON.stringify(myChossenProducts));
  localStorage.setItem("allData", JSON.stringify(myAllData));
  drawFevoriteMenu(fevoriteData);
  countFevorite();
  emptyMenusAction();
}
// function draw Cart Menu
function drawFevoriteMenu(Data) {
  let myItems = Data.map((el, i) => {
    return `
    <div class="item">
    <div class="image">
      <img
        src="../${el.image_url}"
        alt=""
      />
    </div>
    <div class="description">
      <h4>${el.brand.split(" ").slice(0, 6).join(" ")}</h4>
      <h5>Price: $${el.price}</h5>
      <p class="rate">
      <i class="fa-solid fa-star"></i>${el.rate}
      <a href="../html/itemDetails.html"><i class="fa-regular fa-eye" onclick ='showDetails(${
        el.id
      })'></i></a>
      </p>
    </div>
    <i class="removeItem fa-regular fa-trash-can" onclick='removeFevoriteItem(${i})'></i>
  </div>
    `;
  });
  fevoriteContent.innerHTML = myItems.join("");
}
drawFevoriteMenu(fevoriteData);
// remove fevorite from menu
function removeFevoriteItem(item) {
  let chossenItem = fevoriteData[item];
  myAllData.forEach((el) => {
    if (chossenItem.id == el.id) el.fevorite = "false";
  });
  myChossenProducts.forEach((el) => {
    if (chossenItem.id == el.id) el.fevorite = "false";
  });
  fevoriteData.splice(item, 1);
  localStorage.setItem("fevoriteItems", JSON.stringify(fevoriteData));
  localStorage.setItem("cartItems", JSON.stringify(myChossenProducts));
  localStorage.setItem("allData", JSON.stringify(myAllData));
  // if (fevoriteData.length == 0) {
  //   fevoriteMenu.classList.remove("open");
  //   fevoriteMenu.classList.add("remove");
  //   document.body.style.cssText = "overflow: visible;";
  //   overlay.style.display = "none";
  // }
  drawFevoriteMenu(fevoriteData);
  countFevorite();
  drawCartPage(myChossenProducts);
  emptyMenusAction();
}
// counter length fevorite items
function countFevorite() {
  let countItems = fevoriteData.length;
  countfevoriteItems.innerHTML = countItems;
}
countFevorite();

// check My ChossenProducts Length
function checkMyChossenProductsLength() {
  if (myChossenProducts.length == 0) {
    checkOutBtns.forEach((el) => el.classList.add("off"));
  } else checkOutBtns.forEach((el) => el.classList.remove("off"));
}
checkMyChossenProductsLength();
// reomve item from page
function removeItem(item) {
  myChossenProducts.splice(item, 1);
  localStorage.setItem("cartItems", JSON.stringify(myChossenProducts));
  drawCartPage(myChossenProducts);
  checkMyChossenProductsLength();
  totalPrice();
  emptyMenusAction();
}
// decrement Count quantity item
function decrementCount(item) {
  let findItem = myChossenProducts.find((_, i) => i == item);
  if (findItem.count-- == 1) {
    myChossenProducts.splice(item, 1);
  }
  localStorage.setItem("cartItems", JSON.stringify(myChossenProducts));
  checkMyChossenProductsLength();
  drawCartPage(myChossenProducts);
  totalPrice();
  emptyMenusAction();
}
// increment Count quantity item
function incrementCount(item) {
  let findItem = myChossenProducts.find((_, i) => i == item);
  findItem.count++;
  localStorage.setItem("cartItems", JSON.stringify(myChossenProducts));
  drawCartPage(myChossenProducts);
  totalPrice();
  emptyMenusAction();
}

function totalPrice() {
  let count = myChossenProducts
    .map((el) => el.count)
    .reduce((a, v) => a + v, 0);
  let price = myChossenProducts
    .map((el) => el.price * el.count)
    .reduce((s, d) => s + d, 0);
  let estimatedvar = (7.43 * count).toFixed(2);
  let taxvar = (1.5 * count).toFixed(2);
  subtotal.innerHTML = price > 0 ? "$" + price : "--";
  estimated.innerHTML = price > 0 ? "$" + estimatedvar : "--";
  tax.innerHTML = price > 0 ? "$" + taxvar : "--";
  total.children[1].innerHTML =
    price > 0 ? "$" + (price + +estimatedvar + +taxvar).toFixed(2) : "--";
  localStorage.setItem("totalPrice", JSON.stringify(price));
}
totalPrice();

function showDetails(item) {
  localStorage.setItem("detailsItem", item);
  setTimeout(() => {
    location.href = "../html/itemDetails.html";
  }, 250);
}
