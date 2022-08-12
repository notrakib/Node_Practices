const Cart = require("../models/cart");
const Order = require("../models/order");

exports.getOrder = (req, res, next) => {
  Order.find({ userId: req.session.user._id })
    .populate("userId")
    .populate("orderedItems.productId")
    .then((orders) => {
      res.render("order", {
        pageTitle: "Order",
        orders,
      });
    })
    .catch((err) => console.log(err));
};

exports.postOrder = (req, res, next) => {
  const items = [];

  Cart.find({ userId: req.session.user._id })
    .then((product) => {
      let subTotal = 0;
      product.map((each) => {
        items.push({ productId: each.productId, quantity: each.quantity });
        subTotal = +subTotal + each.total;
      });
      return Order.create({
        userId: req.session.user._id,
        orderedItems: items,
        subTotal,
      });
    })
    .then(() => {
      return Cart.deleteMany({ userId: req.session.user._id });
    })
    .then(() => res.redirect("/order"))
    .catch((err) => console.log(err));
};
