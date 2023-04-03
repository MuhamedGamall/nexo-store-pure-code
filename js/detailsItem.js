let currentIndex = 0;
let contentSlider = document.querySelector(".contentSlider");
let imagesContainer = document.querySelector(".imagesContainer");
let sliderImgs = document.querySelector(".sliderImgs");
let textDescription = document.querySelector(".text");
let colorsItem = document.querySelector(".details .color");
let dateItem = document.querySelector(".details .date");

function emptyMenusAction() {
  setTimeout(() => {
    cartBagEmpty.style.display =
      myChossenProducts.length == 0 ? "flex" : "none";
    fevBagEmpty.style.display = fevoriteData.length == 0 ? "flex" : "none";
  }, 300);
  if (myChossenProducts.length == 0) {
    cartMenu.classList.remove("add");
    cartMenu.classList.add("remove");
    document.body.style.cssText = "overflow: visible;";
    overlayCart.style.display = "none";
    cartMenuBtn.style.display = "none";
  } else cartMenuBtn.style.display = "block";
  if (fevoriteData.length == 0) {
    fevoriteMenu.classList.remove("add");
    fevoriteMenu.classList.add("remove");
    document.body.style.cssText = "overflow: visible;";
    overlayFev.style.display = "none";
  }
}
emptyMenusAction();

let item = localStorage.detailsItem;
let productDetails = myAllData.filter((el) => el.id == item);
function drawSlider(chossenItem) {
  let sideImages = chossenItem.map((el) => {
    return `
    <li><img src="../${el.image_url}" alt=""/></li>
    `;
  });
  let allImages = chossenItem[0].image_details.map((el) => {
    return `
    <li><img src="../${el}" alt="" class='allImages'/></li>
    `;
  });
  let image = chossenItem.map((el) => {
    return `
    <img src="../${el.image_url}" alt="" />
    <div class="control">
      <i class="fa-solid fa-angle-left previous" onclick = 'nextOrPrev(${false})'></i>
      <i class="fa-solid fa-angle-right next" onclick = 'nextOrPrev(${true})'></i>
    </div>
    `;
  });
  imagesContainer.innerHTML = sideImages.join("");
  imagesContainer.innerHTML += allImages.join("");
  sliderImgs.innerHTML = image.join("");
}
drawSlider(productDetails);

function drawDiscription(chossenItem) {
  let description = chossenItem.map((el) => {
    return `
    <h1 class="title">${el.brand}</h1>
    <div class="priceAndRate">
    <h5 class="price">$${el.price}</h5>
    |
    <h5 class="rate"><i class="fa-solid fa-star"></i>${el.rate}</h5>
    </div>
    <p class="info">${el.description}</p>
    <div class="size">
    <h5>SELECT SIZE</h5>
    <ul>
      <li>
        <input type="radio" name="on" id="one" />
        <label for="one">35</label>
      </li>
      <li>
        <input type="radio" name="on" id="two" />
        <label for="two">36</label>
      </li>
      <li>
        <input type="radio" name="on" id="three" />
        <label for="three">37</label>
      </li>
      <li>
        <input type="radio" name="on" id="four" />
        <label for="four">38</label>
      </li>
      <li>
        <input type="radio" name="on" id="five" />
        <label for="five">39</label>
      </li>
      <li>
        <input type="radio" name="on" id="six" />
        <label for="six">40</label>
      </li>
      <li>
        <input type="radio" name="on" id="seven" />
        <label for="seven">41</label>
      </li>
      <li>
        <input type="radio" name="on" id="eghit" />
        <label for="eghit">42</label>
      </li>
      <li>
        <input type="radio" name="on" id="nine" />
        <label for="nine">43</label>
      </li>
      <li>
        <input type="radio" name="on" id="teen" />
        <label for="teen">44</label>
      </li>
    </ul>
  </div>
  <div class="color">${el.color.join(" / ")}</div>
  <div class="date">${el.release_date}</div>
  <div class="btns">
    <div class="countAndAddToBag ">
      <div class="count" style='display:${
        myChossenProducts.some((ml) => ml.id == chossenItem[0].id)
          ? "none"
          : "block"
      };'>
        <input type='number' id='countItems' max='10' oninput='maxVal()' value='${
          el.count
        }'/>
      </div>
      <div class="addToBag btn" onclick='addToCart(${el.id})'>
      ${
        myChossenProducts.some((jl) => jl.id == chossenItem[0].id)
          ? "REMOVE TO BAG"
          : "ADD TO BAG"
      }</div>
    </div>
    <div class="addToFevorite btn" onclick = 'addToFevorite(${el.id})'> ${
      el.fevorite == "true" ? "REMOVE TO FEVORITE" : "ADD TO FEVORITE"
    }</div>
  </div>
    `;
  });
  textDescription.innerHTML = description.join("");
}
drawDiscription(productDetails);

let nextBtn = document.querySelector(".next");
let prevBtn = document.querySelector(".previous");
let allImgs = document.querySelectorAll(".imagesContainer img");
let imgActive = document.querySelector(".sliderImgs img");
let countItem = document.querySelector(".countAndAddToBag .count");
let countProducts = document.querySelector(" .countAndAddToBag #countItems");
let addToCartVar = document.querySelector(".addToBag");
let addToFeovriteVar = document.querySelector(".addToFevorite");

// start slider
function showImage() {
  allImgs.forEach((el, i) => {
    el.onclick = () => {
      currentIndex = i;
      handle();
    };
  });
}
showImage();

function handle() {
  allImgs.forEach((el) => el.classList.remove("active"));
  allImgs[currentIndex].classList.add("active");
  imgActive.src = allImgs[currentIndex].src;
}

// next or prev function
function nextOrPrev(isNext) {
  isNext ? currentIndex++ : currentIndex--;
  currentIndex = (currentIndex + allImgs.length) % allImgs.length;
  handle();
}

//  end slider
function maxVal() {
  if (countProducts.value > 10) countProducts.value = 10;
  if (countProducts.value < 1) countProducts.value = 1;
  if (countProducts.value == "") countProducts.value = 1;
}

// function add to cart
function addToCart(item) {
  if (localStorage.username) {
    let chossenItem = productDetails[0];
    let checkChossenItem = myChossenProducts.some((el) => el.id == item);
    if (checkChossenItem) {
      myChossenProducts = myChossenProducts.filter(
        (el) => el.id !== chossenItem.id
      );
      countItem.style.display = "flex";
    } else {
      if (countProducts.value <= 10 && countProducts.value >= 1) {
        chossenItem.count = +countProducts.value;
        myChossenProducts.push(chossenItem);
        countItem.style.display = "none";
        countProducts.value = 1;
      }
    }
    localStorage.setItem("cartItems", JSON.stringify(myChossenProducts));
    addToCartVar.innerHTML = myChossenProducts.some(
      (el) => el.id == chossenItem.id
    )
      ? "REMOVE TO BAG"
      : "ADD TO BAG";
    drawCartMenu(myChossenProducts);
    drawFevoriteMenu(fevoriteData);
    itemsLingth();
    totalPrice();
    emptyMenusAction();
  } else {
    location = "../html/login.html";
  }
}

// function add to fevorite
function addToFevorite(item) {
  if (localStorage.username) {
    let chossenItem = productDetails[0];
    let check = fevoriteData.some((el) => el.id == item);
    if (!check) {
      fevoriteData.push(chossenItem);
    }
    myAllData.forEach((el) => {
      if (el.id == item) {
        if (el.fevorite == "false") {
          el.fevorite = "true";
          addToFeovriteVar.innerHTML = "REMOVE TO FEVORITE";
        } else {
          el.fevorite = "false";
          addToFeovriteVar.innerHTML = "ADD TO FEVORITE";
          fevoriteData = fevoriteData.filter((el) => el.id !== item + 1);
        }
      }
    });
    fevoriteData = myAllData.filter((el) => el.fevorite == "true");
    localStorage.setItem("fevoriteItems", JSON.stringify(fevoriteData));
    localStorage.setItem("cartItems", JSON.stringify(myChossenProducts));
    localStorage.setItem("allData", JSON.stringify(myAllData));
    drawCartMenu(myChossenProducts);
    drawFevoriteMenu(fevoriteData);
    emptyMenusAction();
  } else {
    location = "../html/login.html";
  }
}

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

// function draw Cart Menu
function drawCartMenu(Data) {
  let myCart = Data.map((el, i) => {
    return `
    <div class="item">
    <div class="plusOrMinus">
      <i class="fa-solid fa-plus" onclick='incrementCount(${i})'></i>
      <span>${el.count}</span>
      <i class="fa-solid fa-minus" onclick='decrementCount(${i})'></i>
    </div>
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
    <i class="removeItem fa-regular fa-trash-can"onclick='removeItem(${i})'></i>
  </div>
    `;
  });
  cartContent.innerHTML = myCart.join("");
}
drawCartMenu(myChossenProducts || []);

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
  addToFeovriteVar.innerHTML =
    productDetails[0].fevorite == "true"
      ? "REMOVE TO FEVORITE"
      : "ADD TO FEVORITE";
  drawFevoriteMenu(fevoriteData);
  countFevorite();
  emptyMenusAction();
}

// counter length fevorite items
function countFevorite() {
  let countItems = fevoriteData.length;
  countfevoriteItems.innerHTML = countItems;
}
countFevorite();
function itemsLingth() {
  let countItems = myChossenProducts.length;
  countCartItemsHeader.forEach((el) => (el.innerHTML = countItems));
  countCartItemsMenu.innerHTML = countItems;
}
itemsLingth();

// reomve item from page
function removeItem(item) {
  myChossenProducts.splice(item, 1);
  localStorage.setItem("cartItems", JSON.stringify(myChossenProducts));
  addToCartVar.innerHTML = myChossenProducts.some(
    (el) => el.id == productDetails[0].id
  )
    ? "REMOVE TO BAG"
    : "ADD TO BAG";
    countProducts.style.display = "block";
  totalPrice();
  drawCartMenu(myChossenProducts);
  emptyMenusAction();
  itemsLingth();
}
/// decrement Count quantity item
function decrementCount(item) {
  let findItem = myChossenProducts.find((_, i) => i == item);
  if (findItem.count-- == 1) {
    myChossenProducts.splice(item, 1);
  }
  addToCartVar.innerHTML = myChossenProducts.some(
    (el) => el.id == productDetails[0].id
  )
    ? "REMOVE TO BAG"
    : "ADD TO BAG";
  countItem.style.display = "flex";
  localStorage.setItem("cartItems", JSON.stringify(myChossenProducts));
  drawCartMenu(myChossenProducts);
  totalPrice();
  emptyMenusAction();
  itemsLingth();
}

function incrementCount(item) {
  let findItem = myChossenProducts.find((_, i) => i == item);
  findItem.count++;
  localStorage.setItem("cartItems", JSON.stringify(myChossenProducts));
  drawCartMenu(myChossenProducts);
  totalPrice();
  itemsLingth();
}

function totalPrice() {
  let price = myChossenProducts
    .map((el) => el.price * el.count)
    .reduce((s, d) => s + d, 0);
  total.innerHTML = "Total: $" + price;
  localStorage.setItem("totalPrice", JSON.stringify(price));
}
totalPrice();
function showDetails(item) {
  localStorage.setItem("detailsItem", item);
  setTimeout(() => {
    location.href = "../html/itemDetails.html";
  }, 250);
}
