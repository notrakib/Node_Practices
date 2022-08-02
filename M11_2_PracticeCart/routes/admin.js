const express = require("express");

const route = express.Router();

const adminController = require("../controllers/admin");

route.get("/admin", adminController.getAdmin);
route.post("/admin", adminController.postAdmin);
route.post("/admin-remove", adminController.postRemoveAdmin);

module.exports = route;
