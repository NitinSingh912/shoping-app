let allItems = [];
let displayItems = [];
let itemsInCart = [];
let userSelectedItemsList = [];
let url = "https://fakestoreapi.com/products ";
let cart = document.querySelector(".cart");
let headerButton = document.querySelector("header button");
let firstSection = document.querySelector(".first-section");
let displayItemsDiv = document.querySelector(".display-items");

let categoryDiv = document.querySelector(".category-buttons");
let closeCartButton = document.querySelector(".close-button");
let toalItemsInCart = document.querySelector(".items-in-cart");
let count = 0;
let totalCostOfItemInCart = 0;
let allButtonOfCategoryDiv = document.querySelectorAll(
  ".category-buttons button"
);
// this is category call like suppose if user want to look for only men's clothing or rest then this
// function is related to that
categoryDiv.addEventListener("click", function (e) {
  allButtonOfCategoryDiv.forEach((item, index) => {
    item.classList.remove("active");
    if (item.value === e.target.value) {
      item.classList.add("active");

      let selectedProducts = allItems.filter(
        (i) => i.category === e.target.value
      );
      userSelectedItemsList = [...selectedProducts];
      let divInsideDisplayItem =
        document.querySelectorAll(".display-items div");
      divInsideDisplayItem.forEach((i) => i.remove(item));

      creatingProducts(selectedProducts);
    } else if (e.target.value === "All") {
      userSelectedItemsList = [...allItems];
      let divInsideDisplayItem =
        document.querySelectorAll(".display-items div");
      divInsideDisplayItem.forEach((i) => i.remove(item));

      creatingProducts(allItems);
    }
  });
});
// making a async call and getting the cartItems from the api
async function getData() {
  let data = await fetch(url);
  let json = await data.json();
  allItems = [...json];
}
getData();
// removing the cart so first time user open the cart should not be in ui
function removeCart() {
  cart.remove();
}
removeCart();

// fn to open the cart
headerButton.addEventListener("click", function () {
  firstSection.appendChild(cart);
});
// this fn create alot of elements all the items(cloths,electornics ,rest) you see in ui is
//written in this so everytime it create a new element and display it

function creatingProducts(products) {
  products.forEach((items, index) => {
    let newDiv = document.createElement("div");
    let newFirstDiv = document.createElement("div");
    let newSecondDiv = document.createElement("div");
    let firstDivImg = document.createElement("img");
    let h2 = document.createElement("h2");
    let h3 = document.createElement("h3");
    let h4 = document.createElement("h4");
    let addToCartButton = document.createElement("button");
    addToCartButton.setAttribute("class", "add-to-cart-button");
    addToCartButton.setAttribute("onClick", `onClick(${items.id})`);
    newSecondDiv.appendChild(h2);
    newSecondDiv.appendChild(h3);
    newSecondDiv.appendChild(h4);
    addToCartButton.textContent = "Add To Cart";
    newSecondDiv.appendChild(addToCartButton);
    newFirstDiv.setAttribute("class", "img-portion");
    newSecondDiv.setAttribute("class", "content-portion");
    newFirstDiv.appendChild(firstDivImg);
    firstDivImg.setAttribute("src", `${items.image}`);
    newDiv.setAttribute("class", "content-div");

    newDiv.appendChild(newFirstDiv);
    newDiv.appendChild(newSecondDiv);
    displayItemsDiv.appendChild(newDiv);
    h2.textContent = `Category: ${items.category}`;
    h3.textContent = `Title: ${
      items.title.length == 15 ? items.title : items.title.slice(0, 15) + "..."
    }`;
    h4.textContent = `PRICE: $${items.price}`;
  });
}

// fn to close the cart
closeCartButton.addEventListener("click", function () {
  cart.remove();
});
// this fn will add stuff in cart which is sselected by user
function addStuffToCart(items) {
  cart.innerHTML = "";
  cart.appendChild(closeCartButton);
  items.forEach((items) => {
    let newDiv = document.createElement("div");
    let newFirstDiv = document.createElement("div");
    let newSecondDiv = document.createElement("div");
    let firstDivImg = document.createElement("img");
    let h2 = document.createElement("h2");
    let h3 = document.createElement("h3");
    let h4 = document.createElement("h4");
    let incrementButton = document.createElement("button");
    let decrementButton = document.createElement("button");
    let divContainingButtons = document.createElement("div");
    let itemsNumberDiv = document.createElement("div");
    itemsNumberDiv.textContent = items.quantity;
    divContainingButtons.setAttribute("class", "inc-dec-div");
    divContainingButtons.appendChild(incrementButton);
    divContainingButtons.appendChild(itemsNumberDiv);
    divContainingButtons.appendChild(decrementButton);
    incrementButton.textContent = "+";
    decrementButton.textContent = "-";
    newSecondDiv.appendChild(h2);
    newSecondDiv.appendChild(h3);
    newSecondDiv.appendChild(h4);
    newSecondDiv.appendChild(divContainingButtons);
    newFirstDiv.setAttribute("class", "cart-img-portion");
    newSecondDiv.setAttribute("class", "cart-content-portion");
    newFirstDiv.appendChild(firstDivImg);
    firstDivImg.setAttribute("src", `${items.image}`);
    newDiv.setAttribute("class", "cart-content-div");

    newDiv.appendChild(newFirstDiv);
    newDiv.appendChild(newSecondDiv);
    cart.appendChild(newDiv);
    h2.textContent = `Category: ${items.category}`;
    h3.textContent = `Title: ${
      items.title.length == 15 ? items.title : items.title.slice(0, 15) + "..."
    }`;
    h4.textContent = `PRICE: $${items.price}`;
  });
}

// this fn hold the functionality like after user click on addToCart what should happen like we are getting id
// and also we will fill the cart too according to the id that we pass in an onClick fn
function onClick(id) {
  
  count++;
  toalItemsInCart.textContent = count;
  let selectedItems = userSelectedItemsList.filter((i) => i.id === id);
  
  // itemsInCart
  let findTheItems = itemsInCart.find((i) => i.id === id);
  if (findTheItems) {
    itemsInCart.forEach((items, index) => {
      if (items.id === id) {
        itemsInCart[index] = { ...items, quantity: items.quantity + 1 };
      }
    });
  } else {
    itemsInCart.push({ ...selectedItems[0], quantity: 1 });
  }
  console.log(itemsInCart)
  addStuffToCart(itemsInCart);
}
