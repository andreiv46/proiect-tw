import Student from "../models/student.js";
import Professor from "../models/professor.js";

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
