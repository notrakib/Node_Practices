const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("add-product", { pageTitle: "Add Products" });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const price = req.body.price;
  const category = req.body.category;
  const description = req.body.description;
  const company = req.body.company;

  Product.create({
    title,
    price,
    category,
    description,
    company,
  })
    .then((result) => {
      res.redirect("/all-products");
    })
    .then((err) => console.log(err));
};
