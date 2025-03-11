const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;

const server = http.createServer((req, res) => {
  let filePath = path.join(
    __dirname,
    "../public",
    req.url === "/" ? "index.html" : req.url
  );

  // Redirect about.html to 404.html
  if (req.url === "/about.html") {
    filePath = path.join(__dirname, "../public", "404.html");
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      fs.readFile(
        path.join(__dirname, "../public", "404.html"),
        (error, errorContent) => {
          res.writeHead(404, { "Content-Type": "text/html" });
          res.end(errorContent);
        }
      );
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(content);
    }
  });
});

server.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
