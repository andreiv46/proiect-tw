import EnrollmentSession from "../models/enrollmentSession.js";
import { Op } from "sequelize";

export const checkActiveSessions = async (req, res, next) => {
  try {
    const activeEnrollmentSessions = await EnrollmentSession.findAll({
      where: {
        startTime: { [Op.lt]: new Date() },
        endTime: { [Op.gt]: new Date() },
        enrolledStudents: { [Op.lt]: { [Op.col]: "studentsLimit" } },
      },
    });

    if (activeEnrollmentSessions.length > 0) {
      return res.status(400).json({ message: "Active sessions already exist" });
    }

    next();
  } catch (err) {
    console.log("checkActiveSessions");
    console.warn(err.message);
    res.status(500).json({ message: "Internal server issues" });
  }
};
