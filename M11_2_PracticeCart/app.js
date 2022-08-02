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
const routeAdmin = require("./routes/admin");
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
app.use(routeAdmin);
app.use(routeOthers);

User.hasOne(Manager);
Manager.belongsTo(User);

User.hasOne(Cart);
Cart.belongsTo(User);

Cart.belongsToMany(Product, { through: CartDetails });
Product.belongsToMany(Cart, { through: CartDetails });

CartDetails.belongsTo(Product);
Product.hasMany(CartDetails);

Cart.hasMany(CartDetails);
CartDetails.belongsTo(Cart);

User.hasMany(Order);
Order.belongsTo(User);

CartDetails.hasOne(OrderDetails);
OrderDetails.belongsTo(CartDetails);

Order.hasMany(OrderDetails);
OrderDetails.belongsTo(Order);

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
    return user;
  })

  // .then((user) => {
  //   return user.createCart({ subTotal: 0 });
  // })

  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
