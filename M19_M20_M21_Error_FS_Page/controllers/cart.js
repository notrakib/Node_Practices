const Cart = require("../models/cart");
const Product = require("../models/product");

exports.getAddCart = (req, res, next) => {
  const curpage = +req.query.page;
  const limit = 2;
  const lpp = 3;
  let numofProds;

  Product.find()
    .countDocuments()
    .then((numberofProducts) => {
      numofProds = numberofProducts;
    })
    .then(() => {
      Product.find()
        .skip((curpage - 1) * limit)
        .limit(limit)
        .then((products) => {
          console.log(Math.floor((curpage - 1) / lpp) * lpp);
          console.log(Math.floor((curpage - 1) / lpp) * lpp + +(lpp + 1));
          res.render("all-products", {
            pageTitle: "Cart Item",
            products,
            hasPrev: curpage > lpp,
            hasNext:
              Math.floor((curpage - 1) / lpp) * lpp + +(lpp + 1) <=
              numofProds / limit,
            numberofLoop:
              numofProds / limit - Math.floor((curpage - 1) / lpp) * lpp,
            prev: Math.floor((curpage - 1) / lpp) * lpp,
            next: Math.floor((curpage - 1) / lpp) * lpp + +(lpp + 1),
            curpage,
            lpp,
          });
        });
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

  Cart.findOne({ userId: req.session.user._id, productId })
    .populate("productId")
    .then((cart) => {
      if (!cart) {
        return Cart.create({
          userId: req.session.user._id,
          productId,
          quantity,
          total: price * quantity,
        });
      } else {
        return Cart.updateOne(
          { userId: req.session.user._id, productId },
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
    .catch();
};

exports.getCart = (req, res, next) => {
  Cart.find({ userId: req.session.user._id })
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
