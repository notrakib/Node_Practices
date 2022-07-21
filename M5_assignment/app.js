const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();

const userRoute = require("./routes/user");
const welcomeRoute = require("./routes/welcome");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(userRoute);
app.use(welcomeRoute);

app.listen(3000);
