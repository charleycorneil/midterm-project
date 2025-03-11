const { jsPDF } = require("jspdf");

function generateInvoice(name, email, items) {
  const doc = new jsPDF();
  doc.text(`Invoice for ${name}`, 10, 10);
  doc.text(`Email: ${email}`, 10, 20);

  let y = 30;
  items.forEach((item) => {
    doc.text(`${item.product}: $${item.price}`, 10, y);
    y += 10;
  });

  doc.save("invoice.pdf");
}

module.exports = { generateInvoice };
