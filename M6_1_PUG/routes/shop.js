const express = require("express");
const route = express.Router();

const adminData = require("./admin");

route.get("/", (req, res, next) => {
  const products = adminData.products;
  res.render("shop", { prods: products, doctitle: "Shop", path: "/" });
});

module.exports = route;
