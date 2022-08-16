const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("add-product", { pageTitle: "Add Products" });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const price = req.body.price;
  const image = req.file.filename;
  const category = req.body.category;
  const description = req.body.description;
  const company = req.body.company;
  console.log({
    title,
    image,
    price,
    category,
    description,
    company,
  });

  Product.create({
    title,
    image,
    price,
    category,
    description,
    company,
  })
    .then((result) => {
      res.redirect("/add-cart");
    })
    .catch();
};
