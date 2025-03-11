document
  .getElementById("generateInvoice")
  .addEventListener("click", function () {
    const name = document.getElementById("customerName").value.trim();
    const email = document.getElementById("customerEmail").value.trim();
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0 || name === "" || email === "") {
      alert(
        "Please fill out all fields and add at least one item to the cart."
      );
      return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.text(`Invoice for: ${name}`, 10, 10);
    doc.text(`Email: ${email}`, 10, 20);

    let y = 30;
    cart.forEach((item, index) => {
      doc.text(`${index + 1}. ${item.product} - $${item.price}`, 10, y);
      y += 10;
    });

    doc.save("invoice.pdf");
  });
