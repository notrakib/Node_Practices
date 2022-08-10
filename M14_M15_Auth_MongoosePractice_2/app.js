const path = require("path");
const bodyParser = require("body-parser");
const routeUser = require("./routes/user");
const routeProduct = require("./routes/product");
const routeCart = require("./routes/cart");
const routeOthers = require("./routes/others");
const routeOrder = require("./routes/order");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const csrf = require("csurf");
const flash = require("connect-flash");

const uri = "mongodb+srv://rakib:rakib@cluster0.f4fx5.mongodb.net/practice";
const store = new MongoDBStore({ uri, collection: "session" });

const express = require("express");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({ secret: "Mad", resave: false, saveUninitialized: false, store })
);

app.set("view engine", "ejs");
app.set("views", "views");

app.use(csrf());
app.use(flash());
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isAuthenticated;
  res.locals.csrfToken = req.csrfToken();
  next();
});
app.use(routeUser);
app.use(routeProduct);
app.use(routeCart);
app.use(routeOrder);
app.use(routeOthers);

mongoose
  .connect(uri)
  .then(() => app.listen(3000))
  .catch((err) => console.log(err));
