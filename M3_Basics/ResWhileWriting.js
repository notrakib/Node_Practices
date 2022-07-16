const http = require("http");
const fs = require("fs");

// const rqListener=(req, res)=>{}
// http.createServer(rqListener)

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter Something</title></head>");
    res.write(
      "<body><form method='POST' action='/message'><input type='text' name='message'><button type='submit'>Send</button></form></body>"
    );
    res.write("</html>");
    return res.end();
  }

  if (req.url === "/message" && req.method === "POST") {
    const body = [];

    req.on("data", (chunk) => body.push(chunk));

    return req.on("end", () => {
      const parsedbody = Buffer.concat(body).toString();
      const message = parsedbody.split("=")[1];
      fs.writeFileSync("message.txt", message);
      res.statusCode = 302;
      res.setHeader("Location", "/");
      return res.end();
    });
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My First Page</title></head>");
  res.write("<body><h1>My First Page</h1></body>");
  res.write("</html>");
  res.end();
});

server.listen(3000);
