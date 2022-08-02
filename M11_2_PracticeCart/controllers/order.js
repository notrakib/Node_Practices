const Cart = require("../models/cart");
const CartDetails = require("../models/cart-details");
const Order = require("../models/order");
const OrderDetails = require("../models/orderDetails");
const Product = require("../models/product");

exports.getOrder = (req, res, next) => {
  let orderItems = [];

  let orderedProducts = [];

  let products;

  Product.findAll()
    .then((product) => {
      return (products = product);
    })
    .catch();

  Order.findAll({
    where: { userUserId: req.user.userId },
    include: OrderDetails,
  })
    .then((orderdetail) => {
      orderdetail.map((eachOrder) => {
        let cartDetailsId = [];
        eachOrder.orderDetails.map((each) => {
          cartDetailsId.push(each.cartDetailCartDetailId);
        });
        orderItems.push({ orderId: eachOrder.orderId, cartDetailsId });
      });

      return orderItems;
    })
    .then((orderItems) => {
      let count = 0;
      orderItems.map((eachOrder) => {
        let items = [];
        return CartDetails.findAll({
          where: { cartDetailId: eachOrder.cartDetailsId },
        })
          .then((cartItem) => {
            items.push(cartItem);
            return items;
          })
          .then((items) => {
            orderedProducts.push({ orderId: eachOrder.orderId, items });
            count = +count + 1;
            if (count === orderItems.length) {
              res.render("order", {
                pageTitle: "Order",
                products,
                orderedProducts,
              });
            }
          })
          .catch();
      });
    })
    .then()
    .catch((err) => console.log(err));
};

exports.postOrder = (req, res, next) => {
  let cartCartDetailId = [];

  req.user
    .getCart()
    .then((cart) => {
      return CartDetails.findAll({ where: { cartCartId: cart.cartId } });
    })
    .then((crt) => {
      crt.map((each) => {
        cartCartDetailId.push(each.cartDetailId);
      });
      return cartCartDetailId;
    })
    .then((result) => {
      console.log(result);
    })
    .catch();

  req.user
    .createOrder()
    .then((order) => {
      cartCartDetailId.map((each) => {
        OrderDetails.create({
          orderOrderId: order.orderId,
          cartDetailCartDetailId: each,
        })
          .then()
          .catch();
      });
    })
    .then(() => {
      res.redirect("/order");
    })
    .catch();
};
