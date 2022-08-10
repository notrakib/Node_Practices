const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.getSignup = (req, res, next) => {
  res.render("signup", { pageTitle: "Sign up" });
};

exports.postSignup = (req, res, next) => {
  const name = req.body.name;
  const password = req.body.password;
  const email = req.body.email;

  User.findOne({ email })
    .then((user) => {
      if (user.email) {
        req.flash("error", "Email exists");
        return res.redirect("/login");
      } else {
        return bcrypt.hash(password, 12).then((hashedpassword) => {
          return User.create({ name, email, password: hashedpassword });
        });
      }
    })
    .then(() => {
      res.redirect("/login");
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

exports.getLogin = (req, res, next) => {
  const errorMessage = req.flash("error")[0];

  res.render("login", { pageTitle: "Login", errorMessage });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        req.flash("error", "Invalid Email");
        return res.redirect("/login");
      } else {
        bcrypt
          .compare(password, user.password)
          .then((matched) => {
            if (matched) {
              req.session.user = user;
              req.session.isAuthenticated = true;
              return req.session.save();
            } else {
              req.flash("error", "Invalid Password");
              return res.redirect("/login");
            }
          })
          .then(() => res.redirect("/"));
      }
    })
    .catch((err) => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
  });
  res.redirect("/");
};
