const express = require("express");
const route = express.Router();
const allUser = [];

route.get("/add-user", (req, res, next) => {
  res.render("users", {
    title: "All Users",
    path: "/admin/add-user",
    users: allUser,
  });
});

route.post("/create-user", (req, res, next) => {
  allUser.push({ users: req.body.username });

  res.redirect("/");
});

exports.route = route;
exports.allUser = allUser;
