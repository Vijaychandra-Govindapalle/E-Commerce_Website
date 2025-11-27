document.addEventListener("DOMContentLoaded", () => {
  displayCart();
});

function displayCart() {
  let cart = JSON.parse(localStorage.getItem("cart"));
  let cartCount = localStorage.getItem("cartCount") || new Array(cart.length);
  if (cartCount[0] == 0) {
    cartCount.fill(1);
    localStorage.setItem("cartCount", cartCount);
  }
  let cartContent = document.getElementById("cartContent");
  let totalPrice = document.getElementById("totalPrice");
  console.log(cart);

  cartContent.innerHTML = "";
  let totalBill = 0;

  if (cart.length == 0) {
    cartContent.innerHTML = `<p>Your cart is empty....... </p> <button onclick = "backToHome()" id="startShopping">Start Shopping</button>`;
    totalPrice.style.display = "none";
  }

  cart.map((product, i) => {
    totalBill += product.price * 90;
    let productElement = document.createElement("div");
    productElement.setAttribute("class", "product-info");
    productElement.innerHTML = `
    <div id="cardImage">
      <img src="${product.thumbnail}"/>
      </div>
      <div id="prodDesc">
      <h1>${product.title}</h1>
      <p><strong>Availability: </strong><span>${
        product.availabilityStatus
      }</span></p>
      <p><strong>Category: </strong><span>${product.category}</span></p>
      <p><strong>Return Policy: </strong><span>${
        product.returnPolicy
      }</span></p>
      <p><strong>Shipping Information: </strong><span>${
        product.shippingInformation
      }</span></p>
      <p><strong>Stock: </strong><span>${product.stock}</span></p>
      <p><strong>Warranty Information: </strong><span>${
        product.warrantyInformation
      }</span></p>
      <p><strong>Price: ₹</strong><span>${Math.round(
        product.price * 90
      )}</span></p>
      </div>
      <div id="removebtn">
      <button id="rmbtn" onclick="removeItem(${i})">Remove</button>
      <div id="countBtn">
      <button onclick="increaseCount(${(i, cartCount)})">+</button>
      <p>${cartCount[i]}</p>
      <button onclick="decreaseCount(${(i, cartCount)})">-</button>
      </div>
      </div>
    `;
    cartContent.appendChild(productElement);
  });

  totalPrice.innerHTML = `<h1>Total Bill: ₹${Math.round(totalBill)}</h1>`;
}

function removeItem(id) {
  let cart = JSON.parse(localStorage.getItem("cart"));
  cart.splice(id, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

function backToHome() {
  window.location.href = "../home/home.html";
}

function increaseCount(index, cartCount) {
  cartCount[index]++;
  localStorage.setItem("cartCount", cartCount);
}

function decreaseCount(index, cartCount) {
  cartCount[index]--;
  localStorage.setItem("cartCount", cartCount);
}
