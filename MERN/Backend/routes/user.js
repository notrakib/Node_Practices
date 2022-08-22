const express = require("express");
const route = express.Router();
const { check, body } = require("express-validator");

const userController = require("../controllers/user");
const isAuth = require("../middleware/auth");

route.post("/signup", userController.postSignup);

route.post("/login", userController.postLogin);
route.post("/logout", isAuth, userController.postLogout);

route.post("/forgot-password", userController.postForgotPassword);

route.post("/reset-password", userController.postResetPassword);

module.exports = route;
