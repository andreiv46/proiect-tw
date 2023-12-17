import db from "../config/database.js";
import Sequelize from "sequelize";

const Professor = db.define("Professor", {
  professorId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true,
    unique: true,
  },
  hashedPassword: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

export default Professor;
