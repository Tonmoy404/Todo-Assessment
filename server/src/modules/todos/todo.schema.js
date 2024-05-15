const { string, object, ref } = require("yup");

const createTodoSchema = object().shape({
  title: string()
    .required("Title should not be empty")
    .max(100, "Title can not be more than 100 words"),
  description: string(),
});

const updateTodoSchema = object().shape({
  title: string()
    .required("Title should not be empty")
    .max(100, "Title can not be more than 100 words"),
  description: string(),
});

module.exports.createTodoSchema = createTodoSchema;
module.exports.updateTodoSchema = updateTodoSchema;
