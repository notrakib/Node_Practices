const path = require("path");

const express = require("express");

const route = express.Router();

route.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "views", "welcome.html"));
});

route.post("/create-user", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

module.exports = route;
