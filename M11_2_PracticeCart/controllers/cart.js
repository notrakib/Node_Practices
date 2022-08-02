const Cart = require("../models/cart");
const CartDetails = require("../models/cart-details");
const Product = require("../models/product");
const User = require("../models/user");
const sequelize = require("../util/database");

exports.getAddCartItem = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("add-cartItem", { pageTitle: "Cart Item", products });
    })
    .catch();
};

exports.postCartItem = (req, res, next) => {
  const productId = req.body.prodId;
  const quantity = req.body.qty;

  Product.findAll({ where: { productId } })
    .then((product) => {
      return (price = product[0].price);
    })
    .catch();

  req.user
    .getCart()
    .then((cart) => {
      cart.subTotal = quantity * price + cart.subTotal;
      return cart.save();
    })
    .then(() => {})
    .catch();

  req.user
    .getCart()
    .then((cart) => {
      CartDetails.create({
        quantity,
        total: quantity * price,
        productProductId: productId,
        cartCartId: cart.cartId,
      });
      res.redirect("/add-cartItem");
    })
    .catch();
};

exports.getCartItem = (req, res, next) => {
  let subTotal;
  req.user
    .getCart()
    .then((cart) => {
      subTotal = cart.subTotal;

      return Cart.findAll({
        where: {
          cartId: cart.cartId,
        },
        include: [Product, User, CartDetails],
      });
    })
    .then((cartDetails) => {
      res.render("all-cartItems", {
        pageTitle: "User Cart",
        cartDetails,
        subTotal,
      });
    })
    .catch((err) => console.log(err));
};

exports.getCart = (req, res, next) => {
  Cart.findAll()
    .then((carts) => {
      res.render("all-cart", { pageTitle: "Cart", carts });
    })
    .catch((err) => console.log(err));
};
