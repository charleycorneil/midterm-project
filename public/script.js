let cart = [];

function addToCart(product, price) {
  cart.push({ product, price });
  checkCart();
}

function checkCart() {
  const name = document.getElementById("customerName").value;
  const email = document.getElementById("customerEmail").value;
  document.getElementById("generateInvoice").disabled = !(
    cart.length > 0 &&
    name &&
    email
  );
}
