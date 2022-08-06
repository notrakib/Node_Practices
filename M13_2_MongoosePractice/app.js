const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const routeUser = require("./routes/user");
const routeProduct = require("./routes/product");
const routeCart = require("./routes/cart");
const routeOthers = require("./routes/others");
const routeOrder = require("./routes/order");

const mongoose = require("mongoose");
const user = require("./models/user");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", "views");

app.use((req, res, next) => {
  user
    .findById("62ed6084500b7bd76adad63f")
    .then((foundUser) => {
      req.user = foundUser;

      next();
    })
    .catch((err) => console.log(err));
});

app.use(routeUser);
app.use(routeProduct);
app.use(routeCart);
app.use(routeOrder);
app.use(routeOthers);

mongoose
  .connect("mongodb+srv://rakib:rakib@cluster0.f4fx5.mongodb.net/practice")
  .then(() => {
    return user.findById("62ed6084500b7bd76adad63f");
  })
  .then((foundUser) => {
    if (!foundUser) {
      return user.create({
        name: "rakib bhai",
        email: "r@gmail.com",
        phone: "01910000000",
      });
    }
  })
  .then(() => app.listen(3000))
  .catch((err) => console.log(err));
