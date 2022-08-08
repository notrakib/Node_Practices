const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Manager = sequelize.define("manager", {
  managerId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  isManager: Sequelize.BOOLEAN,
});

module.exports = Manager;
