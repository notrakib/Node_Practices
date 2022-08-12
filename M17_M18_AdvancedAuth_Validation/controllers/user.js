const User = require("../models/user");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { validationResult } = require("express-validator");

exports.getSignup = (req, res, next) => {
  res.render("signup", {
    pageTitle: "Sign up",
    errormsg: req.flash("error")[0],
    oldData: {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });
};

exports.postSignup = (req, res, next) => {
  const name = req.body.name;
  const password = req.body.password;
  const confirm_password = req.body.confirm_password;
  const email = req.body.email;
  const error = validationResult(req);

  if (!error.isEmpty()) {
    console.log(error.array());
    return res.render("signup", {
      pageTitle: "Sign up",
      errormsg: error.array()[0].msg,
      oldData: {
        name,
        email,
        password,
        confirm_password,
      },
    });
  }

  // bcrypt
  //   .hash(password, 12)
  //   .then((hashedpassword) => {
  //     return User.create({ name, email, password: hashedpassword });
  //   })
  //   .then(() => {
  //     res.redirect("/login");
  //   })
  //   .catch((err) => console.log(err));
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

exports.getForgotPassword = (req, res, next) => {
  const errorMessage = req.flash("error")[0];
  res.render("enterEmail", { pageTitle: "Enter Email", errorMessage });
};

exports.postForgotPassword = (req, res, next) => {
  crypto.randomBytes(12, (err, buffer) => {
    if (err) {
      console.log(err);
      res.redirect("/reset-password");
    }
    const token = buffer.toString("hex");

    User.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          req.flash("error", "Never signed up with this email");
        } else {
          user.token = token;
          user.expiaryDate = Date.now() + 3600000;
          console.log("http://localhost:3000/reset-password/" + token);
          return user.save();
        }
      })
      .then((user) => {
        res.redirect("/forgot-password");
      })
      .catch();
  });
};

exports.getResetPassword = (req, res, next) => {
  const token = req.params.token;
  const errorMessage = req.flash("error")[0];

  User.findOne({ token, expiaryDate: { $gt: Date.now() } })
    .then((user) => {
      if (!user) {
        req.flash("error", "Link Invalid");
        res.redirect("/login");
      } else {
        res.render("passReset", {
          pageTitle: "Reset Password",
          errorMessage,
          token,
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postResetPassword = (req, res, next) => {
  const token = req.body.token;
  const password = req.body.password;

  User.findOne({ token, expiaryDate: { $gt: Date.now() } })
    .then((user) => {
      if (!user) {
        req.flash("error", "Link Invalid");
        res.redirect("/login");
      } else {
        return bcrypt.hash(password, 12).then((hashedpassword) => {
          user.password = hashedpassword;
          user.token = undefined;
          user.expiaryDate = undefined;
          user.save().then(() => res.redirect("/"));
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
