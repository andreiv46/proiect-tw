import FinalRequest, { FINAL_STATUS } from "../models/finalRequest.js";
import Student from "../models/student.js";
import Professor from "../models/professor.js";
import { Op } from "sequelize";
import path from "path";
import { sendEmail } from "../config/transporter.js";

export const getProfessorFinalRequests = async (req, res) => {
  try {
    const finalRequests = await FinalRequest.findAll({
      where: {
        professorId: req.body.professorId,
        // status: {
        //   [Op.or]: [FINAL_STATUS.PENDING, FINAL_STATUS.REJECTED],
        // },
        status: FINAL_STATUS.PENDING,
      },
    });

    if (!finalRequests) {
      return res.status(404).json({ message: "No final requests found" });
    }

    return res.status(200).json({ finalRequests });
  } catch (error) {
    console.warn(err);
    return res.status(500).json({ message: "Internal server issues" });
  }
};

export const createFinalRequest = async (req, res) => {
  try {
    const { studentId } = req.body;
    const studentFilePath = req.file.path;

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
        .status(409)
        .json({ message: "Student already made a final request" });
    }

    const finalRequest = await FinalRequest.create({
      professorId: student.assignedProfessorId,
      studentId: studentId,
      studentFilePath: studentFilePath,
      professorFilePath: null,
      status: FINAL_STATUS.PENDING,
    });

    const professor = await Professor.findByPk(student.assignedProfessorId);

    sendEmail(
      professor.email,
      "Cerere finala",
      `Studentul ${student.name} a incarcat o cerere finala.`
    );

    res.status(201).json(finalRequest);
  } catch (error) {
    console.warn(error);
    return res.status(500).json({ message: "Internal server issues" });
  }
};

export const deleteFinalRequest = async (req, res) => {
  try {
    const { finalRequestId } = req.body;

    const finalRequest = await FinalRequest.findOne({
      where: {
        finalRequestId,
      },
    });

    if (!finalRequest) {
      return res.status(404).json({ message: "Final request not found" });
    }

    await finalRequest.destroy();

    return res.status(200).json({ message: "Final request deleted" });
  } catch (err) {
    console.warn(err);
    return res.status(500).json({ message: "Internal server issues" });
  }
};

export const rejectFinalRequest = async (req, res) => {
  try {
    const { finalRequestId } = req.params;
    const { professorId } = req.body;

    if (!finalRequestId) {
      return res.status(400).json({ message: "Missing finalRequestId" });
    }

    const finalRequest = await FinalRequest.findOne({
      where: {
        finalRequestId,
        status: FINAL_STATUS.PENDING,
      },
    });

    if (!finalRequest) {
      return res.status(404).json({ message: "Final request not found" });
    }

    if (finalRequest.professorId !== professorId) {
      return res.status(403).json({ message: "Professor ID does not match" });
    }

    const student = await Student.findByPk(finalRequest.studentId);

    finalRequest.status = FINAL_STATUS.REJECTED;
    await finalRequest.save();

    sendEmail(
      student.email,
      "Cerere respinsa",
      "Cererea ta finala a fost respinsa. Te rugam sa incarci o noua cerere."
    );

    return res.status(200).json({ message: "Final request rejected" });
  } catch (error) {
    console.warn(err);
    return res.status(500).json({ message: "Internal server issues" });
  }
};

export const getFinalRequestPdf = async (req, res) => {
  try {
    const { finalRequestId } = req.params;

    if (!finalRequestId) {
      return res.status(400).json({ message: "Missing finalRequestId" });
    }

    const finalRequest = await FinalRequest.findOne({
      where: {
        finalRequestId,
      },
    });

    if (!finalRequest) {
      return res.status(404).json({ message: "Final request not found" });
    }

    const absolutePath = path.resolve(finalRequest.studentFilePath);

    const fileName = path.basename(absolutePath);
    res.setHeader("Content-Type", "application/pdf");

    return res.status(200).sendFile(absolutePath);
  } catch (err) {
    console.warn(err);
    return res.status(500).json({ message: "Internal server issues" });
  }
};

export const acceptFinalRequest = async (req, res) => {
  try {
    const { finalRequestId } = req.params;
    const { professorId } = req.body;
    const professorFilePath = req.file.path;

    if (!finalRequestId) {
      return res.status(400).json({ message: "Missing finalRequestId" });
    }

    const finalRequest = await FinalRequest.findOne({
      where: {
        finalRequestId,
        status: FINAL_STATUS.PENDING,
      },
    });

    if (!finalRequest) {
      return res.status(404).json({ message: "Final request not found" });
    }

    if (finalRequest.professorId !== professorId) {
      return res.status(403).json({ message: "Professor ID does not match" });
    }

    finalRequest.professorFilePath = professorFilePath;
    finalRequest.status = FINAL_STATUS.ACCEPTED;
    await finalRequest.save();

    const student = await Student.findByPk(finalRequest.studentId);
    student.requestFilePath = professorFilePath;
    await student.save();

    sendEmail(
      student.email,
      "Cerere acceptata",
      "Cererea ta finala a fost acceptata. Cererea poate fi descarcata de pe platforma."
    );

    return res.status(200).json({ message: "Final request accepted", student });
  } catch (err) {
    console.warn(err);
    return res.status(500).json({ message: "Internal server issues" });
  }
};

export const getStudentFinalRequest = async (req, res) => {
  try {
    const { studentId } = req.body;

    if (!studentId) {
      return res.status(400).json({ message: "Missing studentId" });
    }

    const student = await Student.findByPk(studentId);

    if (!student.requestFilePath) {
      return res.status(404).json({ message: "Final request not found" });
    }

    const absolutePath = path.resolve(student.requestFilePath);

    const fileName = path.basename(absolutePath);
    res.setHeader("Content-Type", "application/pdf");

    return res.status(200).sendFile(absolutePath);
  } catch (err) {
    console.warn(err);
    return res.status(500).json({ message: "Internal server issues" });
  }
};
