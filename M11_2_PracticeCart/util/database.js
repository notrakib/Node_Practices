const Sequelize = require("sequelize");

const sequelize = new Sequelize("shop", "root", "Addy@789**$", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
