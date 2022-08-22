const User = require("../models/user");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
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

  bcrypt
    .hash(password, 12)
    .then((hashedpassword) => {
      return User.create({ name, email, password: hashedpassword });
    })
    .then((result) => {
      res.json({ result });
    })
    .catch((err) => {
      return next(new Error(err));
    });
};

exports.getUsers = (req, res, next) => {
  User.find()
    .then((users) => {
      res.render("all-users", { pageTitle: "All Users", users });
    })
    .catch();
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let userInfo;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        throw Error("Invalid Email");
      } else {
        userInfo = {
          userId: user._id,
          email: user.email,
          name: user.name,
        };
        return bcrypt.compare(password, user.password).then((matched) => {
          if (matched) {
            const token = jwt.sign(userInfo, "amiRakib", { expiresIn: "1h" });
            return res.json({ token, userInfo });
          } else {
            throw Error("Invalid Password");
          }
        });
      }
    })
    .catch((err) => {
      next(err);
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
  });
  res.redirect("/");
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
    .catch();
};
