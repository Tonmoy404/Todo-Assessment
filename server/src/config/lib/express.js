const express = require("express");
const cookieParser = require("cookie-parser");
const initPassport = require("../../modules/users/user.strategy");
const passport = require("passport");
const config = require("../index");
const path = require("path");

module.exports = () => {
  const app = express();
  app.use(express.json());
  app.use(cookieParser(process.env.COOKIE_SECRET));
  app.use(passport.initialize());

  initPassport();

  const globalConfig = config.getGlobalConfig();
  globalConfig.routes.forEach(function (routepath) {
    require(path.resolve(routepath))(app);
  });

  globalConfig.strategies.forEach(function (strategyPath) {
    require(path.resolve(strategyPath))();
  });

  app.set("port", process.env.PORT);

  return app;
};
