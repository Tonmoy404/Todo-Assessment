const sequelize = require("../../config/lib/sequelize");
const { DataTypes } = require("sequelize");

const Todo = sequelize.define(
  "task",
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    isCompleted: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    createdBy: {
      allowNull: false,
      type: DataTypes.UUID,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "task",
  }
);

module.exports = Todo;
