// // let rand = [9.1,9.0,8.5,3.4,9.7,5.6,4.9,7.9,5.6,3.2,6.2,9.6,5.1,3.9,7.6,7.4,7.9,8.9,8.5,8.1,5.0,9.0,7.6,3.6,4.2,5.1][Math.floor(Math.random()*26)]
// fetch("../js/data.json").then((response) => {
// 	return response.json();
// })
// .then((response) => {
// 	let arr =[]
// 	response.forEach(el => {
// 		el.rate = [9.1,9.0,8.5,3.4,9.7,5.6,4.9,7.9,5.6,3.2,6.2,9.6,5.1,3.9,7.6,7.4,7.9,8.9,8.5,8.1,5.0,9.0,7.6,3.6,4.2,5.1][Math.floor(Math.random()*26)]
// 	arr.push(el)
// });

// });

// main variaples
// let overlay = document.querySelector(".overlay");
// let myContent = document.querySelector(".contentGrid");
// let openMenu = document.querySelector(".myCart");
// let closeMenu = document.querySelector(".close");
// let cartMenu = document.querySelector(".cartMenu");
// let cartContent = document.querySelector(".cartMenu .content");
// let countCartItemsHome = document.querySelector(".cartMenu .contItems span");
// let countCartItemsMenu = document.querySelector(".contItemsSpan");
// let viewCartBtn = document.querySelector(".cartMenu .content");
// let countItems = document.querySelector(".contItems");
// let total = document.querySelector(".total");

// set color to color filtering
let clr = [...document.querySelectorAll(".box .clrbk")];
clr.forEach((el) => (el.style.background = el.dataset.clr));

// function close And Open Cart Menu
document.addEventListener("click", closeAndOpenCartMenu);
function closeAndOpenCartMenu(Event) {
  if (Event.target.classList.contains("myCart")) {
    cartMenu.classList.add("open");
    cartMenu.classList.remove("remove");
    document.body.style.cssText = "overflow: hidden;";
    overlayCart.style.display = "block";
  }
  if (Event.target.classList.contains("close")) {
    cartMenu.classList.remove("open");
    cartMenu.classList.add("remove");
    document.body.style.cssText = "overflow: visible;";
    overlayCart.style.display = "none";
  }
}

function emptyMenusAction() {
  setTimeout(() => {
    cartBagEmpty.style.display =
      myChossenProducts.length == 0 ? "flex" : "none";
  }, 300);
  if (myChossenProducts.length == 0) {
    cartMenu.classList.remove("add");
    cartMenu.classList.add("remove");
    document.body.style.cssText = "overflow: visible;";
    overlayCart.style.display = "none";
    cartMenuBtn.style.display = "none";
  } else cartMenuBtn.style.display = "block";
}
emptyMenusAction();

// fetch data
fetch("/data.json")
  .then((response) => {
    return response.json();
  })
  .then((response) => {
    let getData = localStorage.allData
      ? JSON.parse(localStorage.getItem("allData"))
      : response;
    myAllData = getData;
    drawContent(myAllData);
    localStorage.setItem("allData", JSON.stringify(myAllData));
  });

// function draw Products
function drawContent(response) {
  let product = response.map((el, i) => {
    return `
    <div class="item" 
    data-aos-easing="linear"
    data-aos="fade-down"
    data-aos-anchor-placement="bottom-bottom"
    >
    <div class="image">
      <img class='myimg' id='${i}' src="${el.image_url}" alt="" data-hover='${
      el.image_details[0]
    }' data-origenl='${el.image_url}'>
      <div class="actionBtns">
      <a href="../html/itemDetails.html"><i class="fa-regular fa-eye" onclick ='showDetails(${
        el.id
      })'></i></a>
      <i class="fa-solid fa-cart-plus" onclick = 'addToCart(${el.id})'></i>
      <i class="fa-regular fa-heart heart ${
        el.fevorite == "true" ? "on" : "off"
      }" onclick = 'addToFevorite(${el.id})'></i>
    </div>
    </div>
    <div class="description">
      <h4>${el.brand.split(" ").slice(0, 9).join(" ")}</h4>
      <h5>$${el.price}</h5>
      <p class="info">${el.description.split(" ").slice(0, 10).join(" ")}</p>
      <p class="rate"><i class="fa-solid fa-star"></i>${el.rate}</p>
    </div>
  </div>
    `;
  });
  myContent.innerHTML = product.join("");
  let myimg = document.querySelectorAll(".myimg");
  hoverImg(myimg);
}

// function add to cart
function addToCart(item) {
  if (localStorage.username) {
    let chossenItem = myAllData.find((el) => el.id == item);
    let checkChossenItem = myChossenProducts.some(
      (el) => el.id == chossenItem.id
    );
    if (checkChossenItem) {
      myChossenProducts = myChossenProducts.map((el) => {
        if (el.id == chossenItem.id) {
          el.count++;
        }
        return el;
      });
    } else {
      myChossenProducts.push(chossenItem);
    }
    localStorage.setItem("cartItems", JSON.stringify(myChossenProducts));
    // draw cart menu check
    drawCartMenu(myChossenProducts);
    totalPrice();
    count();
    emptyMenusAction();
  } else {
    location = "../html/login.html";
  }
}

// function draw Cart Menu
function drawCartMenu(Data) {
  let myCart = Data.map((el, i) => {
    return `
    <div class="item">
    <div class="plusOrMinus">
      <i class="fa-solid fa-plus plus" onclick='incrementCount(${i})'></i>
      <span class='qut'>${el.count}</span>
      <i class="fa-solid fa-minus minus" onclick='decrementCount(${i})'></i>
    </div>
    <div class="image">
      <img
        src="${el.image_url}"
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
    <i class="removeItem fa-regular fa-trash-can"onclick='removeItem(${i})'></i>
  </div>
    `;
  });
  cartContent.innerHTML = myCart.join("");
}
drawCartMenu(myChossenProducts || []);
function categoryCount(dataLength) {
  countCategory.innerHTML = dataLength;
}
categoryCount(myAllData.length);
function count() {
  let countItems = myChossenProducts.length;
  countCartItemsHeader.forEach((el) => (el.innerHTML = countItems));
  countCartItemsMenu.innerHTML = countItems;
}
count();

function removeItem(item) {
  myChossenProducts.splice(item, 1);
  localStorage.setItem("cartItems", JSON.stringify(myChossenProducts));
  drawCartMenu(myChossenProducts || []);
  totalPrice();
  count();
  emptyMenusAction();
}

function decrementCount(item) {
  let findItem = myChossenProducts.find((_, i) => i == item);
  if (findItem.count-- == 1) {
    myChossenProducts.splice(item, 1);
  }
  localStorage.setItem("cartItems", JSON.stringify(myChossenProducts));
  drawCartMenu(myChossenProducts);
  totalPrice();
  count();
  emptyMenusAction();
}

function incrementCount(item) {
  let findItem = myChossenProducts.find((_, i) => i == item);
  findItem.count++;
  localStorage.setItem("cartItems", JSON.stringify(myChossenProducts));
  drawCartMenu(myChossenProducts);
  totalPrice();
}

function totalPrice() {
  let price = myChossenProducts
    .map((el) => el.price * el.count)
    .reduce((s, d) => s + d, 0);
  total.innerHTML = "Total: $" + price;
  localStorage.setItem("totalPrice", JSON.stringify(price));
}
totalPrice();

function hoverImg(images) {
  images.forEach((el, i) => {
    el.addEventListener("mouseenter", () => {
      el.src = el.dataset.hover;
    });
    el.addEventListener("mouseleave", () => {
      el.src = el.dataset.origenl;
    });
  });
}
function showDetails(item) {
  localStorage.setItem("detailsItem", item);
  setTimeout(() => {
    location.href = "../html/itemDetails.html";
  }, 250);
}

inputSearch.addEventListener("keyup", searchByName);
function searchByName() {
  let val = inputSearch.value.trim().toLowerCase();
  let filterData = myAllData.filter((el) =>
    el.brand.toLowerCase().includes(val)
  );
  countCategory;
  setTimeout(() => {
    categoryCount(filterData.length);
    filterData.length
      ? drawContent(filterData)
      : (myContent.innerHTML = `<h1>NO RESULT</h1>`);
  }, 500);
}
// function filter all data
document.addEventListener("click", filter);
let globalPriceVar;
let globalColorVar;
function filter(Event) {
  if (Event.target.classList.contains("price")) {
    let priceVal = Event.target.dataset.price.split("_");
    let filterByPrice = myAllData.filter((el) =>
      priceVal.reduce((acc, crr) => el.price >= +acc && el.price <= +crr)
    );
    globalPriceVar = filterByPrice;
  }
  if (Event.target.classList.contains("allClrs")) {
    globalColorVar = globalPriceVar;
    searchBtn.forEach(
      (el) => (el.style.cssText = "opacity:1;user-select:inherit;")
    );
  }
  if (Event.target.classList.contains("clr")) {
    let colorVal = Event.target.dataset.clr.toLowerCase();
    let filterByColor = (globalPriceVar || myAllData).filter((el) =>
      el.color.includes(colorVal)
    );
    globalColorVar = filterByColor;
  }
  if (globalColorVar || globalPriceVar) {
    if (Event.target.classList.contains("searchBtn")) {
      setTimeout(() => {
        categoryCount(
          (globalColorVar || []).length || (globalPriceVar || []).length
        );
        drawContent(globalColorVar || globalPriceVar);
        if (myContent.children.length == 0) {
          myContent.innerHTML = `<h1>NO RESULT</h1>`;
          categoryCount(0);
          sortingPriceBtn.style.display = "none";
        }
      }, 500);
      megaMenuBar.classList.remove("open");
      megaMenuBar.classList.add("close");
      document.body.style.cssText = "overflow: visible;";
      overlayMegaMenu.style.display = "none";
      sortingPriceBtn.style.display = "flex";
    }
    searchBtn.forEach(
      (el) => (el.style.cssText = "opacity:1;user-select:inherit;")
    );
  }
}
// function sort data
document.addEventListener("click", sortData);
function sortData(Event) {
  if (Event.target.classList.contains("sortingPrice")) {
    if (sortMenu.classList.contains("off")) {
      sortMenu.classList.toggle("on");
      icon.classList.toggle("fa-chevron-up");
    }
  }
  if (Event.target.classList.contains("srt")) {
    sortElement.forEach((el) => el.classList.remove("active"));
    Event.target.classList.add("active");
    sortMenu.classList.remove("on");
  }
  if (Event.target.dataset.srt == "highLow") {
    let highLow = (globalColorVar || globalPriceVar || myAllData).sort(
      (h, l) => l.price - h.price
    );
    setTimeout(() => {
      drawContent(highLow);
    }, 250);
  }
  if (Event.target.dataset.srt == "lowHigh") {
    let lowHigh = (globalColorVar || globalPriceVar || myAllData).sort(
      (h, l) => h.price - l.price
    );
    setTimeout(() => {
      drawContent(lowHigh);
    }, 250);
  }
}

// function handel mega menu
document.addEventListener("click", closeOpenMegaMenu);
function closeOpenMegaMenu(Event) {
  if (Event.target.classList.contains("openMenu")) {
    megaMenuBar.classList.add("open");
    document.body.style.cssText = "overflow: hidden;";
    overlayMegaMenu.style.display = "block";
  }
  if (Event.target.classList.contains("closeBtn")) {
    megaMenuBar.classList.remove("open");
    megaMenuBar.classList.add("close");
    document.body.style.cssText = "overflow: visible;";
    overlayMegaMenu.style.display = "none";
  }
}
