const { createUser, loginUser, logOut } = require("./user.controller");
const validateUser = require("../core/middleware/validate");
const AuthStrategy = require("./user.authentication.middleware");
const { createUserSchema } = require("./user.schema");

module.exports = (app) => {
  app.route("/users").post(validateUser(createUserSchema), createUser);

  app.route("/users/login").post(loginUser);

  app.route("/users/logout").post(AuthStrategy, logOut);

  app.get("/test", function (Req, res) {
    res.send("Running");
  });
};
