const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const OrderDetails = sequelize.define("orderDetails", {
  orderDetailId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  quantity: Sequelize.INTEGER,
  subTotal: Sequelize.INTEGER,
});

module.exports = OrderDetails;
