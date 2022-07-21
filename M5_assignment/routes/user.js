const path = require("path");
const express = require("express");
const route = express.Router();

route.get("/users", (req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "views", "user.html"));
});

module.exports = route;
