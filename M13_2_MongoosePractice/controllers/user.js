const User = require("../models/user");

exports.getAddUser = (req, res, next) => {
  res.render("add-user", { pageTitle: "Add User" });
};

exports.postAddUser = (req, res, next) => {
  const name = req.body.name;
  const phone = req.body.phone;
  const email = req.body.email;

  User.create({ name, email, phone })
    .then((users) => {
      res.redirect("/all-users");
    })
    .catch((err) => console.log(err));
};

exports.getUsers = (req, res, next) => {
  User.find()
    .then((users) => {
      res.render("all-users", { pageTitle: "All Users", users });
    })
    .then((err) => console.log(err));
};
