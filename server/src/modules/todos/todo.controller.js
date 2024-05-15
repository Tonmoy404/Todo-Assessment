const Todo = require("./todo.model");
const uuid = require("uuid-random");

async function createTodo(req, res) {
  try {
    const { title, description, isCompleted } = req.body;
    const createdBy = req.user.id;

    const newTodo = await Todo.create({
      id: uuid(),
      title,
      description,
      isCompleted,
      createdBy,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    console.log("---Todo Created Successfully---");
    return res.status(201).json(newTodo);
  } catch (err) {
    console.log("Cannot Create Todo.. The Error---->", err);
    return res.status(500).send("Internal Server Error");
  }
}

async function getAllTodo(req, res) {
  try {
    const todos = await Todo.findAll();

    if (!todos) {
      return res.status(404).send("No Todo was found");
    }

    return res.status(200).json(todos);
  } catch (err) {
    console.log("Cannot Get All Todo...The Error---->", err);
    return res.status(500).send("Internal Server Error");
  }
}

async function getTodosByUserId(req, res) {
  try {
    const userID = req.user.id;
    const todos = await Todo.findAll({ where: { createdBy: userID } });
    if (todos.length === 0) {
      return res.status(404).send("No Todo Found");
    }
    return res.status(200).json(todos);
  } catch (err) {
    console.log("Cannot fetch todo...The Error---->", err);
    return res.status(500).send("Internal Server Error");
  }
}

async function getTodoById(req, res) {
  try {
    const { id } = req.params;

    const todo = await Todo.findOne({ where: { id } });
    if (!todo) {
      return res.status(404).send("Todo was not found");
    }

    return res.status(200).json(todo);
  } catch (err) {
    console.log("Cannot get Todo with the ID....The Error---->", err);
    return res.status(500).json("Internal Server Error");
  }
}

async function updateTodo(req, res) {
  try {
    const { id } = req.params;
    const { title, description, isCompleted } = req.body;

    const userID = req.user.id;
    const todo = await Todo.findOne({ where: { id } });
    if (!todo) {
      return res.status(404).send("Todo was not found");
    }
    if (todo.createdBy !== userID) {
      return res.status(401).send("Unauthorized User");
    }

    todo.title = title;
    todo.description = description;
    todo.isCompleted = isCompleted;

    console.log("the todo--------", todo);

    await todo.save();
    console.log("---Todo Updated Successfully---");
    return res.status(200).json(todo);
  } catch (err) {
    console.log("Cannot update todo..The Error---->", err);
    return res.status(500).send("Internal Server Error");
  }
}

async function deleteTodo(req, res) {
  try {
    const { id } = req.params;
    const userID = req.user.id;

    const todo = await Todo.findOne({ where: { id } });
    console.log("The Todo--------", todo);
    if (todo.createdBy !== userID) {
      return res.status(401).send("Unauthorized User");
    }

    await todo.destroy();

    console.log("Todo Deleted Successfully");
    return res.status(200).send("Todo Deleted Successfully");
  } catch (err) {
    console.log("Cannot delete todo....The Error---->", err);
    return res.status(500).send("Internal Server Error");
  }
}

module.exports.createTodo = createTodo;
module.exports.getAllTodo = getAllTodo;
module.exports.getTodoById = getTodoById;
module.exports.updateTodo = updateTodo;
module.exports.deleteTodo = deleteTodo;
module.exports.getTodosByUserId = getTodosByUserId;
