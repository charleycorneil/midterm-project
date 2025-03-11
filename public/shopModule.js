let cart = [];

function addToCart(product, price) {
  cart.push({ product, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  checkCart();
}

function checkCart() {
  const name = document.getElementById("customerName").value.trim();
  const email = document.getElementById("customerEmail").value.trim();
  const generateInvoiceBtn = document.getElementById("generateInvoice");

  cart = JSON.parse(localStorage.getItem("cart")) || [];

  generateInvoiceBtn.disabled = !(
    cart.length > 0 &&
    name !== "" &&
    email !== ""
  );
}

document.getElementById("customerName").addEventListener("input", checkCart);
document.getElementById("customerEmail").addEventListener("input", checkCart);

window.addToCart = addToCart;
