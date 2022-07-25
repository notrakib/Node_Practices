const Product = require("../models/products");

exports.getAddProduct = (req, res, next) => {
  res.render("add-product", {
    pagetitle: "Add_product",
    path: "/admin/add-product",
  });
};

exports.getProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect("/");
};

exports.getWelcome = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop", { prods: products, doctitle: "Shop", path: "/" });
  });
};
