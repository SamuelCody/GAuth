const express = require("express");
const passport = require("passport");
const { authenticator } = require("../middleware/authenticator");
const { dashboard } = require("../handlers/auth/dashboard");
const { callback } = require("../handlers/auth/callback");
const { logout } = require("../handlers/auth/logout");

const router = express.Router();

// index page route
router.get("/", function (req, res) {
    try {
        return res.redirect("/auth");
    } catch (err) {
        return res.render('auth');
    }
});

// sign in/up with google page route
router.get("/auth", function (req, res) {
    return res.render("auth");
});

// dashboard page after login
router.get("/dashboard", authenticator, dashboard);

// google auth route
router.get("/auth/google", passport.authenticate('google', { scope: ['profile'] }));

//handling google redirect route
router.get("/auth/google/callback", passport.authenticate('google', { failureRedirect: '/' }), callback);

//logout route
router.get("/logout", logout);

//every other route should display error 404
router.get("*", function(req, res) {
    return res.render("404");
});

module.exports = router;