const express = require("express");

const route = express.Router();

const cartController = require("../controllers/cart");

route.get("/all-cart", cartController.getCart);
route.post("/add-cartItem", cartController.postCartItem);
route.get("/add-cartItem", cartController.getAddCartItem);
route.get("/all-cartItem", cartController.getCartItem);

module.exports = route;
