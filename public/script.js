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

    const companyName = "Custom Creations & Digital Essentials";
    const companyAddress = "123 Main Street, Indianapolis, IN 46204";
    const companyPhone = "(317) 555-1234";
    const companyEmail = "support@customcreations.com";

    doc.setFontSize(18);
    doc.text(companyName, 10, 10);
    doc.setFontSize(12);
    doc.text(companyAddress, 10, 20);
    doc.text(`Phone: ${companyPhone}`, 10, 30);
    doc.text(`Email: ${companyEmail}`, 10, 40);

    doc.setFontSize(14);
    doc.text("Invoice To:", 10, 60);
    doc.setFontSize(12);
    doc.text(`Name: ${name}`, 10, 70);
    doc.text(`Email: ${email}`, 10, 80);

    const invoiceNumber = Math.floor(10000000 + Math.random() * 90000000);
    const purchaseDate = new Date().toLocaleString();

    doc.text(`Invoice #: ${invoiceNumber}`, 140, 60);
    doc.text(`Date: ${purchaseDate}`, 140, 70);

    let y = 100;
    doc.setFontSize(12);
    doc.text("Item", 10, y);
    doc.text("Price", 90, y);
    doc.text("Quantity", 120, y);
    doc.text("Total", 160, y);

    y += 10;

    let subtotal = 0;
    let quantities = {};

    cart.forEach((item) => {
      if (!quantities[item.product]) {
        quantities[item.product] = 1;
      } else {
        quantities[item.product]++;
      }
    });

    Object.keys(quantities).forEach((product) => {
      const price = cart.find((item) => item.product === product).price;
      const quantity = quantities[product];
      const total = price * quantity;
      subtotal += total;

      doc.text(product, 10, y);
      doc.text(`$${price.toFixed(2)}`, 90, y);
      doc.text(`${quantity}`, 130, y);
      doc.text(`$${total.toFixed(2)}`, 160, y);

      y += 10;
    });

    const taxRate = 0.07;
    const taxAmount = subtotal * taxRate;
    const grandTotal = subtotal + taxAmount;

    y += 10;
    doc.text(`Subtotal: $${subtotal.toFixed(2)}`, 140, y);
    y += 10;
    doc.text(`Tax (7%): $${taxAmount.toFixed(2)}`, 140, y);
    y += 10;
    doc.setFontSize(14);
    doc.text(`Grand Total: $${grandTotal.toFixed(2)}`, 140, y);

    doc.save(`invoice_${invoiceNumber}.pdf`);
  });
