var express = require("express");
var router = express.Router();
var passport = require("../config/passport.js");

router.get("/login", function (req, res) {
  res.render("auth/login");
});

router.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/google/callback", passport.authenticate("google"), authSuccess);

function authSuccess(req, res) {
  res.redirect("http://localhost:3000/");
}

module.exports = router;
