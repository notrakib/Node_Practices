// const http = require("http");

const express = require("express");

const app = express();

app.use("/", (req, res, next) => {
  console.log("1");
  next();
});

app.use("/1", (req, res, next) => {
  console.log("ok");
  res.send("<h1>The Response 1</h1>");
});

app.use("/", (req, res, next) => {
  console.log("ok");
  res.send("<h1>The Response</h1>");
});

// const server = http.createServer(app);

// server.listen(3000);

app.listen(3000);
