const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");

app.set("view engine", "pug");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const welcome = require("./routes/welcome");
const users = require("./routes/users");

app.use(welcome.route);
app.use("/admin", users.route);

app.listen(3000);
