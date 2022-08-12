const express = require("express");

const route = express.Router();

const productController = require("../controllers/product");
const isAuth = require("../middleware/auth");

route.get("/add-product", isAuth, productController.getAddProduct);
route.post("/add-product", isAuth, productController.postAddProduct);

module.exports = route;
