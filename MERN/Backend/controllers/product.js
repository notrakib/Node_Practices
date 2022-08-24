const Product = require("../models/product");

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const price = req.body.price;
  const image = req.file.filename;
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
    .catch((err) => next(err));
};

exports.getEditProduct = (req, res, next) => {
  const prodId = req.params.prodId;

  Product.findOne({ _id: prodId })
    .then((product) => {
      return res.status(200).json({ product });
    })
    .catch((err) => next(err));
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.params.prodId;

  Product.findOne({ _id: prodId })
    .then((product) => {
      if (req.body.title) {
        product.title = req.body.title;
      }
      if (req.body.price) {
        product.price = req.body.price;
      }
      if (req.file) {
        product.image = req.file.filename;
      }
      if (req.body.category) {
        product.category = req.body.category;
      }

      if (req.body.description) {
        product.description = req.body.description;
      }
      if (req.body.company) {
        product.company = req.body.company;
      }
      return product.save().then((result) => {
        return res.status(200).json({ result });
      });
    })
    .catch((err) => next(err));
};
