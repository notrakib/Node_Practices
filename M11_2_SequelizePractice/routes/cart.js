const express = require("express");

const route = express.Router();

const cartController = require("../controllers/cart");

route.post("/add-cartItem", cartController.postCartItem);
route.get("/add-cartItem", cartController.getAddCartItem);
route.get("/all-cartItem", cartController.getCartItem);
route.post("/edit-cartItem", cartController.postEditCartItem);

module.exports = route;
