const Manager = require("../models/manager");
const User = require("../models/user");

exports.getAdmin = (req, res, next) => {
  User.findAll({ include: Manager })
    .then((users) => {
      res.render("all-manager", { pageTitle: "Admin", users });
      res.end();
    })
    .catch();
};

exports.postAdmin = (req, res, next) => {
  const userId = req.body.id;

  Manager.create({ userUserId: userId, isManager: true })
    .then(res.redirect("/admin"))
    .catch();
};

exports.postRemoveAdmin = (req, res, next) => {
  const userId = req.body.id;

  Manager.destroy({
    where: {
      userUserId: userId,
    },
  })
    .then(() => {
      res.redirect("/admin");
    })
    .catch((err) => {
      console.log(err);
    });
};
