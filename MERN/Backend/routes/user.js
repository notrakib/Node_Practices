const express = require("express");
const route = express.Router();
const { check, body } = require("express-validator");

const userController = require("../controllers/user");

route.post("/signup", userController.postSignup);

route.post("/login", userController.postLogin);

route.post("/forgot-password", userController.postForgotPassword);

route.post("/reset-password/:token", userController.postResetPassword);

module.exports = route;
