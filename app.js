// 3RD Party Module
const express = require("express");
const morgan = require("morgan");
const flash = require("connect-flash");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");

// Local Module
const adminRouter = require("./routes/adminRoutes");

const app = express();

// Middleware from express
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan("dev"));

// Read Static File
app.use(express.static(`${__dirname}/public`));

// Setting view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Flash and express session for notification
app.use(
  session({
    secret: "geeksforgeeks",
    saveUninitialized: true,
    resave: true,
  })
);
app.use(flash());

app.use("/", adminRouter);

module.exports = app;
