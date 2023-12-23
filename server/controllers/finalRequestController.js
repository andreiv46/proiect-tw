import FinalRequest, { FINAL_STATUS } from "../models/finalRequest.js";
import Student from "../models/student.js";
import { Op } from "sequelize";

export const getProfessorFinalRequests = async (req, res) => {
  try {
    const finalRequests = await FinalRequest.findAll({
      where: {
        professorId: req.body.professorId,
        status: {
          [Op.or]: [FINAL_STATUS.PENDING, FINAL_STATUS.REJECTED],
        },
      },
    });

    if (!finalRequests) {
      return res.status(404).json({ message: "No final requests found" });
    }

    return res.status(200).json({ finalRequests });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createFinalRequest = async (req, res) => {
  try {
    const { studentId, studentFilePath } = req.body;

    if (!studentId || !studentFilePath) {
      return res
        .status(400)
        .json({ message: "Missing studentId or studentFilePath" });
    }

    const student = await Student.findByPk(studentId);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    if (!student.assignedProfessorId) {
      return res
        .status(404)
        .json({ message: "Student has not been assigned a professor yet" });
    }

    const studentRequests = await FinalRequest.findAll({
      where: {
        studentId,
        status: {
          [Op.or]: [FINAL_STATUS.PENDING, FINAL_STATUS.ACCEPTED],
        },
      },
    });

    if (studentRequests.length > 0) {
      return res
        .status(400)
        .json({ message: "Student already made a final request" });
    }

    const finalRequest = await FinalRequest.create({
      professorId: student.assignedProfessorId,
      studentId: studentId,
      studentFilePath: studentFilePath,
      professorFilePath: null,
      status: FINAL_STATUS.PENDING,
    });

    res.status(201).json(finalRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
