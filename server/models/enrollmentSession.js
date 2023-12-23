import db from "../config/database.js";
import Sequelize from "sequelize";

const EnrollmentSession = db.define("EnrollmentSession", {
  sessionId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  professorId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  professorName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  enrolledStudents: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  startTime: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  endTime: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  studentsLimit: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

export default EnrollmentSession;
