export function addToCart(product, price) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({ product, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  checkCart();
}

export function checkCart() {
  const name = document.getElementById("customerName").value;
  const email = document.getElementById("customerEmail").value;
  document.getElementById("generateInvoice").disabled = !(
    cart.length > 0 &&
    name &&
    email
  );
}
