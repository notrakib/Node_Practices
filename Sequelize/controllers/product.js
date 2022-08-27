const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("add-product", { pageTitle: "Add Products" });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const price = req.body.price;
  const category = req.body.category;
  const description = req.body.description;

  Product.create({
    title: title,
    price: price,
    category: category,
    description: description,
  })
    .then((result) => {
      res.redirect("/all-products");
    })
    .then((err) => console.log(err));
};
