import EnrollmentSession from "../models/enrollmentSession.js";
import { Op } from "sequelize";

export const createEnrollmentSession = async (req, res) => {
  try {
    const { professorId, startTime, endTime, studentsLimit } = req.body;

    console.log(professorId, startTime, endTime, studentsLimit);

    if (!professorId || !startTime || !endTime || !studentsLimit) {
      return res.status(400).json({ message: "Malformed request" });
    }

    const newEnrollmentSession = await EnrollmentSession.create({
      professorId: professorId,
      startTime: startTime,
      endTime: endTime,
      enrolledStudents: 0,
      studentsLimit: studentsLimit,
    });

    if (!newEnrollmentSession) {
      return res.status(400).json({ message: "Invalid data" });
    }

    res
      .status(201)
      .json({ message: "Enrollment session created", newEnrollmentSession });
  } catch (err) {
    console.warn(err.message);
    res.status(500).json({ message: "Internal server issues" });
  }
};

export const getActiveEnrollmentSessions = async (req, res) => {
  try {
    const activeEnrollmentSessions = await EnrollmentSession.findAll({
      where: {
        startTime: { [Op.lt]: new Date() },
        endTime: { [Op.gt]: new Date() },
        enrolledStudents: { [Op.lt]: { [Op.col]: "studentsLimit" } },
      },
    });

    if (!activeEnrollmentSessions) {
      return res.status(404).json({ message: "No active sessions " });
    }

    res.status(200).json({ activeEnrollmentSessions });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Internal server issues" });
  }
};
