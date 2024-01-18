import Student from "../models/student.js";
import Professor from "../models/professor.js";
import path from "path";

export const getStudents = async (req, res) => {
  try {
    const { professorId } = req.body;

    if (!professorId) {
      return res.status(400).json({ message: "Malformed request" });
    }

    const students = await Student.findAll({
      where: {
        assignedProfessorId: professorId,
      },
      attributes: {
        exclude: ["hashedPassword"],
      },
    });

    if (!students) {
      return res.status(404).json({ message: "Students not found" });
    }

    return res.status(200).json({ students });
  } catch (err) {
    console.warn(err);
    return res.status(500).json({ message: "Internal server issues" });
  }
};

export const getProfessor = async (req, res) => {
  try {
    const { professorId } = req.params;

    if (!professorId) {
      return res.status(400).json({ message: "Malformed request" });
    }

    const professor = await Professor.findOne({
      where: {
        professorId,
      },
      attributes: {
        exclude: ["hashedPassword"],
      },
    });

    if (!professor) {
      return res.status(404).json({ message: "Professor not found" });
    }

    return res.status(200).json({ professor });
  } catch (err) {
    console.warn(err);
    return res.status(500).json({ message: "Internal server issues" });
  }
};

export const getFinalRequestFromStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { professorId } = req.body;

    if (!studentId) {
      return res.status(400).json({ message: "Malformed request" });
    }

    const student = await Student.findOne({
      where: {
        studentId,
        assignedProfessorId: professorId,
      },
      attributes: {
        exclude: ["hashedPassword"],
      },
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    if (!student.requestFilePath) {
      return res.status(404).json({ message: "Request file not found" });
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
