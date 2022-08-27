const Cart = require("../models/cart");
const CartDetails = require("../models/cart-details");
const Product = require("../models/product");
const User = require("../models/user");

exports.getAddCartItem = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("add-cartItem", { pageTitle: "Cart Item", products });
    })
    .catch();
};

exports.postCartItem = (req, res, next) => {
  const productProductId = req.body.prodId;
  const price = req.body.price;
  const quantity = req.body.qty;

  req.user
    .getCart()
    .then((cart) => {
      return CartDetails.create({
        quantity,
        total: quantity * price,
        cartCartId: cart.cartId,
        productProductId,
      });
    })
    .then(() => res.redirect("/all-cartItem"))
    .catch((err) => console.log(err));
};

exports.postEditCartItem = (req, res, next) => {
  const cartDetailId = req.body.cartDetailId;
  const price = req.body.price;
  const quantity = req.body.edit;

  CartDetails.findOne({ where: { cartDetailId } })
    .then((cart) => {
      cart.quantity = cart.quantity + +quantity;
      cart.total = price * (+cart.quantity + +quantity);
      cart.productProductId;
      cart.cartCartId;
      return cart.save();
    })
    .then((cartDetail) => {
      if (cartDetail.quantity === 0) {
        return CartDetails.destroy({
          where: { cartDetailId: cartDetail.cartDetailId },
        });
      }
    })
    .then(() => res.redirect("/all-cartItem"))
    .catch((err) => console.log(err));
};

exports.getCartItem = (req, res, next) => {
  Cart.findOne({
    where: { userUserId: req.user.userId },
    include: [
      { model: CartDetails, include: [{ model: Product }] },
      { model: User },
    ],
  })
    .then((cartDetails) => {
      res.render("all-cartItems", {
        pageTitle: "User Cart",
        cartDetails,
      });
    })
    .catch((err) => console.log(err));
};
