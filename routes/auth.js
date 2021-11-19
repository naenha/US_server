var express = require("express");
var router = express.Router();
var passport = require("../config/passport.js");

/*
 * GOOGLE LOGIN
 */

router.get("/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/google/callback",
  passport.authenticate("google", {
    failureRedirect: "https://us.paas-ta.org/check",
  }),
  function (req, res) {
    const token = {
      accessToken: req.authInfo.dataValues.accessToken,
      email: req.authInfo.dataValues.email,
    };

  res.redirect(`https://us.paas-ta.org/check?accessToken=${token.accessToken}`);
    
  }
);

module.exports = router;
