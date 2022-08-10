const express = require("express");

const route = express.Router();

const userController = require("../controllers/user");
const isAuth = require("../middleware/auth");

route.get("/signup", userController.getSignup);
route.post("/signup", userController.postSignup);
route.get("/all-users", isAuth, userController.getUsers);
route.get("/login", userController.getLogin);
route.post("/login", userController.postLogin);
route.post("/logout", userController.postLogout);

module.exports = route;
