const express = require("express");

const route = express.Router();

const productController = require("../controllers/product");

route.get("/add-product", productController.getAddProduct);
route.post("/add-product", productController.postAddProduct);
route.get("/all-products", productController.getProducts);
route.post("/edit-product/:productId");
route.post("/delete-product");
route.get("/all-product");
route.get("/product-details");

module.exports = route;
