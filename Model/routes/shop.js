const express = require("express");
const route = express.Router();

const adminData = require("./admin");

const productsController = require("../controllers/product");

route.get("/", productsController.getWelcome);

module.exports = route;
