const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const CartDetails = sequelize.define("cartDetails", {
  cartDetailId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  total: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
});

module.exports = CartDetails;
