const express = require("express");
const route = express.Router();

const products = [];

route.get("/add-product", (req, res, next) => {
  res.render("add-product", {
    pagetitle: "Add_product",
    path: "/admin/add-product",
  });
});

route.post("/product", (req, res, next) => {
  products.push({ title: req.body.title });
  res.redirect("/");
});

exports.route = route;
exports.products = products;
