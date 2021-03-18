const express = require("express");
const ejs = require("ejs");
const session = require("express-session");
const passport = require("passport");
const cookieParser = require("cookie-parser");

const app = express();
const auth = require('../routes/auth');

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(cookieParser());
//Express sessions
app.use(session({
    secret: process.env.JWT_SECRET_KEY,
    resave: true,
    saveUninitialized: true,
}));

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//passport config
require('../config/passport')(passport);

//all routes will be here 
app.use(auth);

module.exports = app;