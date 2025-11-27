let AllProducts = [];
let contentBox = document.getElementById("contentBox");

function fetchData() {
  fetch("https://dummyjson.com/products")
    .then((res) => {
      return res.json();
    })
    .then((val) => {
      AllProducts = val.products;
      displayProduct(AllProducts);
      localStorage.setItem("allproducts", JSON.stringify(AllProducts));
    });
}
fetchData();

function displayProduct(product) {
  console.log("from displayProducts", product);
  let output = "";
  product.map((v) => {
    let stars = "";
    for (let i = 0; i < v.rating; i++) {
      stars += "⭐";
    }
    output += `
    <div>
    <img src="${v.thumbnail}">
    <h5>${v.title}</h5>
    <div id="rating"><p>Rating:${stars}</p></div>
    <div id="price"><p>Price: ₹ ${Math.round(
      v.price * 90
    )}</p><button id = "view" onclick = "viewMore(${v.id})">
    View More</button></div>
    </div>
    `;
  });
  contentBox.innerHTML = output;
}

document
  .getElementById("searchProduct")
  .addEventListener("input", function searchTerm(e) {
    // console.log(e);
    let searchItem = e.target.value.toLowerCase();
    // console.log(searchItem);
    let filteredProduct = AllProducts.filter((product) => {
      return (
        product.title.toLowerCase().includes(searchItem) ||
        product.category.toLowerCase().includes(searchItem)
      );
    });
    displayProduct(filteredProduct);
  });

function viewMore(id) {
  console.log(id);
  localStorage.setItem("productId", id);
  window.location.href = "../viewMore/viewMore.html";
}
