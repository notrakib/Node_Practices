const path = require("path");
const bodyParser = require("body-parser");
const multer = require("multer");
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

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "images")));

app.use(
  session({ secret: "Mad", resave: false, saveUninitialized: false, store })
);

app.set("view engine", "ejs");
app.set("views", "views");

app.use(csrf());
app.use(flash());
app.use((req, res, next) => {
  if (!req.session.user) {
    res.locals.isAuthenticated = undefined;
    res.locals.csrfToken = req.csrfToken();
    return next();
  }

  res.locals.isAuthenticated = req.session.isAuthenticated;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use(routeUser);
app.use(routeProduct);
app.use(routeCart);
app.use(routeOrder);
app.use(routeOthers);
app.use((error, req, res, next) => {
  res.render("500", { pageTitle: "Fixing!" });
});

mongoose
  .connect(uri)
  .then(() => app.listen(3000))
  .catch((err) => console.log(err));
