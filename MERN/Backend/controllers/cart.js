const Cart = require("../models/cart");
const Product = require("../models/product");

exports.getAddCart = (req, res, next) => {
  Product.find()
    .then((products) => {
      return res.json({ products });
    })
    .catch((err) => next(err));
};

exports.postCart = (req, res, next) => {
  const productId = req.body.productId;
  const price = req.body.price;
  let quantity;

  if (req.body.edit) {
    quantity = req.body.edit;
  } else quantity = req.body.qty;

  Cart.findOne({ userId: req.userId, productId })
    .populate("productId")
    .then((cart) => {
      if (!cart) {
        return Cart.create({
          userId: req.userId,
          productId,
          quantity,
          total: price * quantity,
        });
      } else {
        return Cart.updateOne(
          { userId: req.userId, productId },
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
    .then((result) => {
      res.json({ result });
    })
    .catch((err) => next(err));
};

exports.getCart = (req, res, next) => {
  Cart.find({ userId: req.userId })
    .populate("userId")
    .populate("productId")
    .then((cartItems) => {
      res.json({ cartItems });
    })
    .catch((err) => next(err));
};
