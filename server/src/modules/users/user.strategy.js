const passport = require("passport");
const { Strategy } = require("passport-jwt");
const { findUser } = require("./user.controller");

module.exports = function () {
  function cookieExtractor(req) {
    let token = null;

    if (req && req.headers.cookie) {
      const cookie = req.headers.cookie;
      token = cookie.split("access_token=")[1];
    }
    console.log("the token----", token);
    return token;
  }

  passport.use(
    "user-jwt",
    new Strategy(
      {
        secretOrKey: process.env.JWT_SECRET,
        jwtFromRequest: cookieExtractor,
      },
      async function (payload, done) {
        console.log("the Payload------", payload);
        console.log("the Payload ID---------->", payload.id);
        const user = await findUser(payload.id);
        if (!user) done(null, false);
        done(null, user);
      }
    )
  );
};
