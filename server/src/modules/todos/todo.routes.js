const AuthStrategy = require("../users/user.authentication.middleware");
const validate = require("../core/middleware/validate");
const { createTodoSchema, updateTodoSchema } = require("./todo.schema");
const {
  createTodo,
  getAllTodo,
  getTodoById,
  updateTodo,
  deleteTodo,
  getTodosByUserId,
} = require("./todo.controller");

module.exports = (app) => {
  app
    .route("/todo/new")
    .post(AuthStrategy, validate(createTodoSchema), createTodo);

  app.route("/todo/all").get(AuthStrategy, getAllTodo);
  app.route("/todo/:id").get(AuthStrategy, getTodoById);
  app.route("/todo/user/all").get(AuthStrategy, getTodosByUserId);
  app
    .route("/todo/:id")
    .patch(AuthStrategy, validate(updateTodoSchema), updateTodo);

  app.route("/todo/:id").delete(AuthStrategy, deleteTodo);
};
