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

  // Explicitly handle requests for about.html by returning a 500 error
  if (req.url === "/about.html") {
    res.writeHead(500, { "Content-Type": "text/html" });
    return res.end(
      "<h1>500 - Internal Server Error</h1><p>The about page is unavailable.</p>"
    );
  }

  // Read file and serve response
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
