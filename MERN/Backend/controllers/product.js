const Product = require("../models/product");

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const price = req.body.price;
  const image = req.body.file;
  const category = req.body.category;
  const description = req.body.description;
  const company = req.body.company;

  Product.create({
    title,
    image,
    price,
    category,
    description,
    company,
  })
    .then((result) => {
      return res.status(200).json({ result });
    })
    .catch();
};
