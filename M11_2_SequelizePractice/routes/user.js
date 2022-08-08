const express = require("express");

const route = express.Router();

const userController = require("../controllers/user");

route.get("/add-user", userController.getAddUser);
route.post("/add-user", userController.postAddUser);
route.get("/all-users", userController.getUsers);

module.exports = route;
