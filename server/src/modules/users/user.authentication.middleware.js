const passport = require("passport");

function AuthStrategy(req, res, next) {
  const Auth = passport.authenticate("user-jwt", (err, user) => {
    if (err) {
      console.log("The error inside AuthStrategy----->", err);
      res.status(500).send("Internal Server Error");
    }

    if (!user) return res.status(400).send("Unauthenticated User");

    req.logIn(user, { session: false }, (err) => {
      if (err) return next(err);
      req.user = user;
      next();
    });
  });
  Auth(req, res, next);
}

module.exports = AuthStrategy;
