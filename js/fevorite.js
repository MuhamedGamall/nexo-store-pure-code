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
function emptyFevMenuAction() {
  setTimeout(() => {
    fevBagEmpty.style.display = fevoriteData.length == 0 ? "flex" : "none";
  }, 300);
  if (fevoriteData.length == 0) {
    fevoriteMenu.classList.remove("open");
    fevoriteMenu.classList.add("remove");
    document.body.style.cssText = "overflow: visible;";
    overlayFev.style.display = "none";
  }
}
emptyFevMenuAction();

// function add to fevorite
function addToFevorite(item) {
  if (localStorage.username) {
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
          fevoriteData = fevoriteData.filter((el) => el.id !== item + 1);
        }
      }
    });
    fevoriteData = myAllData.filter((el) => el.fevorite == "true");
    localStorage.setItem("fevoriteItems", JSON.stringify(fevoriteData));
    localStorage.setItem("allData", JSON.stringify(myAllData));
    countFevorite();
    emptyFevMenuAction();
    drawFevoriteMenu(fevoriteData);
  } else {
    location.href = "html/login.html";
  }
} 

// function draw Cart Menu
function drawFevoriteMenu(Data) {
  let myItems = Data.map((el, i) => {
    return `
    <div class="item">
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
      <a href="html/itemDetails.html"><i class="fa-regular fa-eye" onclick ='showDetails(${
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

function removeFevoriteItem(item) {
  let chossenItem = fevoriteData[item];
  myAllData.forEach((el) => {
    if (chossenItem.id == el.id) el.fevorite = "false";
  });
  fevoriteData.splice(item, 1);
  localStorage.setItem("fevoriteItems", JSON.stringify(fevoriteData));
  localStorage.setItem("allData", JSON.stringify(myAllData));
  drawFevoriteMenu(fevoriteData);
  countFevorite();
  drawContent(myAllData);
  emptyFevMenuAction();
}

function countFevorite() {
  let countItems = fevoriteData.length;
  countfevoriteItems.innerHTML = countItems;
}
countFevorite();
function showDetails(item) {
  localStorage.setItem("detailsItem", item);
  setTimeout(() => {
    location.href = "html/itemDetails.html";
  }, 250);
}
