const express = require("express");

const route = express.Router();

const orderController = require("../controllers/order");
const isAuth = require("../middleware/auth");

route.get("/order", isAuth, orderController.getOrder);
route.post("/order", isAuth, orderController.postOrder);

module.exports = route;
