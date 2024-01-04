import Student from "../models/student.js";

export const verifyAssignedProfessor = async (req, res, next) => {
  try {
    const { studentId } = req.body;

    const student = await Student.findByPk(studentId);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    if (student.assignedProfessorId) {
      return res
        .status(409)
        .json({ message: "Student already has a professor assigned" });
    }
    next();
  } catch (err) {
    console.warn(err.message);
    res.status(500).json({ message: "Internal server issues" });
  }
};
