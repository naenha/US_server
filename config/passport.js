var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth2").Strategy;
const User = require("../models/user");
const bcrypt = require("bcrypt");
const config = require("./key");

passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: config.client_id,
      clientSecret: config.client_secret,
      callbackURL: "/auth/google/callback",
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      console.log("profile: ", profile);
      console.log("accessToken", accessToken);
      try {
        const exUser = await User.findOne({
          where: {
            email: profile.emails[0].value,
            provider: "google",
          },
        });
        if (exUser) {
          return done(null, exUser);
        } else {
          const hashedPassword = await bcrypt.hash(profile.displayName, 11);
          const newUser = await User.create({
            email: profile.emails[0].value,
            password: hashedPassword,
            nick: profile.displayName,
            snsId: profile.id,
            provider: "google",
          });
          done(null, newUser);
        }
      } catch (err) {
        console.error(err);
        done(err);
      }

      done(null, user);
    }
  )
);

module.exports = passport;
