const express = require("express");

const route = express.Router();

route.get("/", (req, res, next) => {
  res.render("welcome", { pageTitle: "Welcome" });
});

route.get("/welcome", (req, res, next) => {
  res.render("welcome", { pageTitle: "Welcome" });
});

route.use((req, res, next) => {
  res.render("404", { pageTitle: "Error!" });
});

module.exports = route;
