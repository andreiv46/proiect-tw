import db from "../config/database.js";
import Sequelize from "sequelize";

export const PRESTATUS = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
};

const PreliminaryRequest = db.define("PreliminaryRequest", {
  preliminaryRequestId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  studentId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  sessionId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  professorJustification: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});
export default PreliminaryRequest;
