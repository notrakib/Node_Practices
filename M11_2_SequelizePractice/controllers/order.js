const Cart = require("../models/cart");
const CartDetails = require("../models/cart-details");
const Order = require("../models/order");
const OrderDetails = require("../models/orderDetails");
const User = require("../models/user");
const Product = require("../models/product");

exports.getOrder = (req, res, next) => {
  Order.findAll({
    where: { userUserId: req.user.userId },
    include: [
      { model: User },
      { model: OrderDetails, include: [{ model: Product }] },
    ],
  })
    .then((orderDetails) => {
      res.render("order", { pageTitle: "Order", orderDetails });
    })
    .catch((err) => console.log(err));
};

exports.postOrder = (req, res, next) => {
  let orderOrderId;

  req.user
    .createOrder()
    .then((order) => {
      console.log(order.orderId);
      orderOrderId = order.orderId;
    })
    .then(() => {
      return Cart.findOne({
        where: { userUserId: req.user.userId },
        include: [{ model: CartDetails, include: [{ model: Product }] }],
      });
    })
    .then((cartDetails) => {
      cartDetails.cartDetails.map((each) => {
        return OrderDetails.create({
          quantity: each.quantity,
          subTotal: each.total,
          orderOrderId,
          productProductId: each.productProductId,
        });
      });
    })
    .then(() => {
      return req.user.getCart();
    })
    .then((cart) => {
      return CartDetails.destroy({ where: { cartCartId: cart.cartId } });
    })
    .then(() => {
      res.redirect("/order");
    })
    .catch((err) => console.log(err));
};
