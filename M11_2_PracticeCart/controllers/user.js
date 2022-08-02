const User = require("../models/user");

exports.getAddUser = (req, res, next) => {
  res.render("add-user", { pageTitle: "Add User" });
};

exports.postAddUser = (req, res, next) => {
  const fname = req.body.fname;
  const lname = req.body.lname;
  const phone = req.body.phone;
  const email = req.body.email;
  const password = req.body.password;

  User.create({ fname, lname, phone, email, password })
    .then((users) => {
      res.redirect("/all-users");
    })
    .catch((err) => console.log(err));
};

exports.getUsers = (req, res, next) => {
  User.findAll()
    .then((users) => {
      res.render("all-users", { pageTitle: "All Users", users });
    })
    .then((err) => console.log(err));
};
