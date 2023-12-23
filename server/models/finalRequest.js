import db from "../config/database.js";
import Sequelize from "sequelize";

export const FINAL_STATUS = {
  PENDING: "PENDING",
  ACCEPTED: "ACCEPTED",
  REJECTED: "REJECTED",
};

const FinalRequest = db.define("FinalRequest", {
  finalRequestId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  professorId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  studentId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  studentFilePath: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  professorFilePath: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

export default FinalRequest;
