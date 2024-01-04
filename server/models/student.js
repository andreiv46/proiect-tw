import db from "../config/database.js";
import Sequelize from "sequelize";

const Student = db.define("Student", {
  studentId: {
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
    allowNull: false,
    unique: true,
  },
  year: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  major: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  studentClass: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  hashedPassword: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  assignedProfessorId: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  requestFilePath: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

export default Student;
