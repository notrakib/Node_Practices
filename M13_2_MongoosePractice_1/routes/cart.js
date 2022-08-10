const express = require("express");

const route = express.Router();

const cartController = require("../controllers/cart");

route.post("/add-cart", cartController.postCart);
route.get("/add-cart", cartController.getAddCart);
route.get("/all-cart", cartController.getCart);

module.exports = route;
