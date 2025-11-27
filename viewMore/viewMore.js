document.addEventListener("DOMContentLoaded", () => {
  let AllProducts = JSON.parse(localStorage.getItem("allproducts"));
  let productId = localStorage.getItem("productId");
  let productDetails = document.getElementById("productDetails");
  console.log(productId);
  console.log(productDetails);
  if (AllProducts && productId) {
    let selectedProduct = AllProducts.find((val) => {
      return val.id == productId;
    });
    console.log(selectedProduct);
    if (selectedProduct) {
      productDetails.innerHTML = `
      <div id="productCard">
      <div id="cardImage">
      <img src="${selectedProduct.thumbnail}"/>
      </div>
      <div id="prodDesc">
      <h2>${selectedProduct.title}</h2>
      <p><strong>Brand: </strong><span>${selectedProduct.brand}</span></p>
      <p><strong>Category: </strong><span>${selectedProduct.category}</span></p>
      <p><strong>Description: </strong><span>${
        selectedProduct.description
      }</span></p>
      <p><strong>Price: ₹</strong><span>${Math.round(
        selectedProduct.price * 90
      )}</span></p>
      <div id="addBack">
      <button id="addToCart">Add to Cart</button>
      <button id="backToHome">Back to Home</button>
      </div>
      </div>
      </div>
      <div id="customerReviews">
      <h2>Customer Reviews</h2>
      <hr>
      ${selectedProduct.reviews.map((v) => {
        let date = new Date(v.date);
        let hearts = "";
        for (let i = 1; i <= 5; i++) {
          if (i <= v.rating) {
            hearts += "❤️";
          } else {
            hearts += "🖤";
          }
        }
        return `<p> <br> ${hearts} <br> ${v.comment} <br> By ${
          v.reviewerName
        } on ${date.toString()} </p> <br> <hr>   `;
      })}
      </div>
      `;
      document.getElementById("backToHome").addEventListener("click", () => {
        window.location.href = "../home/home.html";
      });

      document.getElementById("addToCart").addEventListener("click", () => {
        AddToCart(selectedProduct);
      });
    } else {
      productDetails.innerHTML = "<p>Product Not Available...</p>";
    }
  } else {
    productDetails.innerHTML = "<p>Product Not Found</p>";
  }
});

function AddToCart(product) {
  console.log(product);
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("product added to cart");
  window.location.href = "../cart/cart.html";
}
