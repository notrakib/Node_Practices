const express = require("express");

const route = express.Router();

const productController = require("../controllers/product");

route.get("/add-product", productController.getAddProduct);
route.post("/add-product", productController.postAddProduct);

module.exports = route;
