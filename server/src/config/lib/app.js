const sequelize = require("./sequelize");

module.exports.start = () => {
  const app = require("./express")();

  app.listen(app.get("port"), () => {
    console.log(`Server is Running on PORT => ${app.get("port")}`);
  });
};

async function testDB() {
  try {
    await sequelize.authenticate();
    console.log("The DB connected successfully");
  } catch (err) {
    console.log("Cannot connect to the DB.. The error--->", err);
  }
}

testDB();
