const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const sequelize = require("./util/database");
const User = require("./models/user");
const Product = require("./models/product");
const Manager = require("./models/manager");
const Order = require("./models/order");
const Cart = require("./models/cart");
const CartDetails = require("./models/cart-details");
const routeUser = require("./routes/user");
const routeProduct = require("./routes/product");
const routeCart = require("./routes/cart");
const routeOthers = require("./routes/others");
const routeOrder = require("./routes/order");
const OrderDetails = require("./models/orderDetails");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", "views");

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch();
});

app.use(routeUser);
app.use(routeProduct);
app.use(routeCart);
app.use(routeOrder);
app.use(routeOthers);

User.hasOne(Cart);
Cart.belongsTo(User);

CartDetails.belongsTo(Product);
Product.hasMany(CartDetails);

Cart.hasMany(CartDetails);
CartDetails.belongsTo(Cart);

User.hasMany(Order);
Order.belongsTo(User);

Order.hasMany(OrderDetails);
OrderDetails.belongsTo(Order);

Product.hasMany(OrderDetails);
OrderDetails.belongsTo(Product);

sequelize
  .sync()
  .then(() => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({
        fname: "u",
        lname: "u",
        phone: "019",
        email: "u@u",
        password: "pass",
      });
    }
  })
  .then((user) => {
    if (user) return user.createCart();
  })
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
