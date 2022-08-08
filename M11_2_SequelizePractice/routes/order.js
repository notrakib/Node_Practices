const express = require("express");

const route = express.Router();

const orderController = require("../controllers/order");

route.get("/order", orderController.getOrder);
route.post("/order", orderController.postOrder);

module.exports = route;
