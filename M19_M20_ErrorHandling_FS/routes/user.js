const express = require("express");
const route = express.Router();
const { check, body } = require("express-validator");

const userController = require("../controllers/user");
const isAuth = require("../middleware/auth");
const User = require("../models/user");

route.get("/signup", userController.getSignup);
route.post(
  "/signup",
  [
    check("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((user) => {
          if (user) {
            return Promise.reject("Email exists already");
          }
        });
      })
      .normalizeEmail(),

    body("password", "Password length is between 5 to 8")
      .isLength({ min: 5 })
      .isLength({ max: 8 })
      .trim(),

    body("confirm_password")
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords have to match!");
        }
        return true;
      }),
  ],
  userController.postSignup
);
route.get("/all-users", isAuth, userController.getUsers);

route.get("/login", userController.getLogin);
route.post("/login", userController.postLogin);
route.post("/logout", userController.postLogout);

route.get("/forgot-password", userController.getForgotPassword);
route.post("/forgot-password", userController.postForgotPassword);
route.get("/reset-password/:token", userController.getResetPassword);
route.post("/reset-password", userController.postResetPassword);

module.exports = route;
