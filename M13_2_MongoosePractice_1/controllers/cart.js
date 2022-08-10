const Cart = require("../models/cart");
const Product = require("../models/product");

exports.getAddCart = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render("all-products", { pageTitle: "Cart Item", products });
    })
    .catch();
};

exports.postCart = (req, res, next) => {
  const productId = req.body.prodId;
  const price = req.body.price;
  let quantity;

  if (req.body.edit) {
    quantity = req.body.edit;
  } else quantity = req.body.qty;

  Cart.findOne({ userId: req.user._id, productId })
    .populate("productId")
    .then((cart) => {
      if (!cart) {
        return Cart.create({
          userId: req.user._id,
          productId,
          quantity,
          total: price * quantity,
        });
      } else {
        return Cart.updateOne(
          { userId: req.user._id, productId },
          {
            $set: {
              quantity: +quantity + cart.quantity,
              total: +cart.total + cart.productId.price * quantity,
            },
          }
        );
      }
    })
    .then(() => {
      return Cart.deleteMany({ quantity: 0 });
    })
    .then(() => {
      res.redirect("/add-cart");
    })
    .catch((err) => console.log(err));
};

exports.getCart = (req, res, next) => {
  Cart.find({ userId: req.user._id })
    .populate("userId")
    .populate("productId")
    .then((cartItems) => {
      res.render("all-cart", {
        pageTitle: "User Cart",
        cartItems,
      });
    })
    .catch((err) => console.log(err));
};
