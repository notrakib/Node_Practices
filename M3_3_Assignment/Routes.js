const RequestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Greetings</title></head>");
    res.write("<body>");
    res.write("<h1>Add User</h1>");
    res.write("<form method='POST' action='/create-user' type='submit'>");
    res.write("<input name='username'></input>");
    res.write("<button >Add User</button>");
    res.write("</form>");
    res.write("</body>");
    res.write("</html>");
    res.end();
  }
  if (url === "/users") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>User Page</title></head>");
    res.write("<body>");
    res.write("<h1>Users</h1>");
    res.write("<ul>");
    res.write("<li>User1</li>");
    res.write("<li>User2</li>");
    res.write("<li>User3</li>");
    res.write("</ul>");
    res.write("</body>");
    res.write("</html>");
    res.end();
  }

  if (url === "/create-user" && method === "POST") {
    const data = [];

    req.on("data", (chunk) => {
      data.push(chunk);
    });

    req.on("end", () => {
      const parsedbody = Buffer.concat(data).toString();
      const message = parsedbody.split("=")[1];
      console.log(message);
    });
    res.statusCode = 302;
    res.setHeader("Location", "/users");
    res.end();
  }
};

module.exports = RequestHandler;
