const express = require("express");
const route = express.Router();

route.get("/", (req, res, next) => {
  res.render("welcome", { title: "Welcome", path: "/" });
});

exports.route = route;
