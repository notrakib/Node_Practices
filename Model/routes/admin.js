const express = require("express");
const route = express.Router();

const productsController = require("../controllers/product");

route.get("/add-product", productsController.getAddProduct);

route.post("/product", productsController.getProduct);

exports.route = route;
