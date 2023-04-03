usernameProfile.innerHTML = localStorage.username;
descriptionProfile.innerHTML = localStorage.descriptionProfile || "";
emailProfile.innerHTML = localStorage.mail;
passProfile.innerHTML =
  "Password: " + String(localStorage.password).replace(/\w/g, "*");
// check File function
upload.onchange = () => checkFile();
function checkFile() {
  let file = upload.files[0];
  if (file.type === "image/jpeg" || file.type === "image/png") {
    file.size <= 2 * 1024 * 1024
      ? uploadFile(file)
      : alert("This image is not supported because it is larger than 2 MB");
  } else {
    alert("This File Not Supported");
  }
}

// upload img function
function uploadFile(file) {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    myPhoto.src = reader.result;
    localStorage.setItem("myPhoto", myPhoto.src);
  };
}

// function check Database for img
function checkDatabase() {
  if (localStorage.myPhoto) {
    myPhoto.src = localStorage.myPhoto;
  }
}
checkDatabase();

// function edit profile
editBtn.onclick = () => edit();
function edit() {
  if (localStorage.username) {
    inputEdit.innerHTML = `
  <input class="changeName inpt" type="text" name="name" placeholder="New Username"/>
  <input class="changeMail  inpt" type="email" name="mail" placeholder="New Email" />
  <input class="changePass  inpt" type="password" name="pass" placeholder="New Password"  minlength="4"  maxlength="20"/>
  <label for="uploadFile" class ='changePhoto'> Change Photo</label>
  `;
    descriptionProfile.innerHTML = `
  <input class="changeDescription inpt" placeholder="New discrption"/>
  `;
    let changeName = document.querySelector(".changeName");
    let changeMail = document.querySelector(".changeMail");
    let changePass = document.querySelector(".changePass");
    let changeDescription = document.querySelector(".changeDescription");

    inputEdit.style.display = "flex";
    usernameProfile.style.display = "none";
    emailProfile.style.display = "none";
    passProfile.style.display = "none";
    editBtn.style.display = "none";
    showPassword.style.display = "none";
    saveBtn.style.display = "block";

    changeName.value = localStorage.username;
    changeMail.value = localStorage.mail;
    changePass.value = localStorage.password;
    changeDescription.value = localStorage.descriptionProfile || "";
  } else {
    location.href = "../html/login.html";
  }
}

// function save edit
myForm.addEventListener("submit", save);
function save(Event) {
  if (localStorage.username) {
    Event.preventDefault();
    let changeName = document.querySelector(".changeName");
    let changeMail = document.querySelector(".changeMail");
    let changePass = document.querySelector(".changePass");
    let changeDescription = document.querySelector(".changeDescription");
    if (
      changeName.value.trim() ||
      changeMail.value.trim() ||
      changePass.value.trim() ||
      changePass.value.trim() ||
      changeDescription.value.trim()
    ) {
      localStorage.username = changeName.value.trim() || localStorage.username;
      localStorage.mail = changeMail.value.trim() || localStorage.mail;
      localStorage.password = changePass.value.trim() || localStorage.password;
      localStorage.descriptionProfile =
        changeDescription.value.trim() || localStorage.descriptionProfile || "";
      passProfile.innerHTML =
        "Password: " + String(localStorage.password).replace(/\w/g, "*");
      usernameProfile.innerHTML = localStorage.username;
      emailProfile.innerHTML = localStorage.mail;
      descriptionProfile.innerHTML = localStorage.descriptionProfile || " ";
    }
    usernameProfile.style.display = "block";
    emailProfile.style.display = "block";
    passProfile.style.display = "block";
    editBtn.style.display = "block";
    showPassword.style.display = "block";
    saveBtn.style.display = "none";
    inputEdit.style.display = "none";
  } else {
    location.href = "/html/login.html";
  }
}

showPassword.onclick = () => showPass();
function showPass() {
  if (showPassword.classList.contains("fa-eye")) {
    showPassword.classList.remove("fa-eye");
    showPassword.classList.add("fa-eye-slash");
    passProfile.innerHTML = "Password: " + localStorage.password;
  } else {
    showPassword.classList.remove("fa-eye-slash");
    showPassword.classList.add("fa-eye");
    passProfile.innerHTML =
      "Password: " + String(localStorage.password).replace(/\w/g, "*");
  }
}

// function close And Open fevorite Menu
document.addEventListener("click", closeAndOpenFevMenu);
function closeAndOpenFevMenu(Event) {
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

// reomve item from page
function removeItem(item) {
  myChossenProducts.splice(item, 1);
  localStorage.setItem("cartItems", JSON.stringify(myChossenProducts));
  totalPrice();
  emptyMenusAction();
  drawCartMenu(myChossenProducts || []);
  itemsLingth();
}

// decrement Count quantity item
function decrementCount(item) {
  let findItem = myChossenProducts.find((_, i) => i == item);
  if (findItem.count-- == 1) {
    myChossenProducts.splice(item, 1);
  }
  localStorage.setItem("cartItems", JSON.stringify(myChossenProducts));
  totalPrice();
  emptyMenusAction();
  drawCartMenu(myChossenProducts || []);
  itemsLingth();
}

// increment Count quantity item
function incrementCount(item) {
  let findItem = myChossenProducts.find((_, i) => i == item);
  findItem.count++;
  localStorage.setItem("cartItems", JSON.stringify(myChossenProducts));
  totalPrice();
  emptyMenusAction();
}

function showDetails(item) {
  localStorage.setItem("detailsItem", item);
  setTimeout(() => {
    location.href = "../html/itemDetails.html";
  }, 250);
}

function totalPrice() {
  let price = myChossenProducts
    .map((el) => el.price * el.count)
    .reduce((s, d) => s + d, 0);
  total.innerHTML = "Total: $" + price;
  localStorage.setItem("totalPrice", JSON.stringify(price));
}
totalPrice();
function itemsLingth() {
  let countItems = myChossenProducts.length;
  countCartItemsHeader.forEach((el) => (el.innerHTML = countItems));
  countCartItemsMenu.innerHTML = countItems;
}
itemsLingth();
