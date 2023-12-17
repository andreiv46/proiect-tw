import Student from "../models/student.js";
import bcrypt from "bcrypt";

export const registerStudent = async (req, res) => {
  const { name, email, year, major, studentClass, password } = req.body;

  if (!name || !email || !year || !major || !studentClass || !password) {
    res.status(400).json({ message: "malformed request" });
    return;
  }

  const studentExists = await Student.findOne({ where: { email } });

  if (studentExists) {
    res.status(400).json({ message: "Student already exists" });
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newStudent = await Student.create({
    name: name,
    email: email,
    year: year,
    major: major,
    studentClass: studentClass,
    hashedPassword: hashedPassword,
    assignedProfessorId: null,
  });

  if (newStudent) {
    res.status(201).json({
      message: "Student created",
      studentId: newStudent.studentId,
      name: newStudent.name,
      email: newStudent.email,
      year: newStudent.year,
      major: newStudent.major,
      studentClass: newStudent.studentClass,
      assignedProfessorId: newStudent.assignedProfessorId,
    });
  } else {
    res.status(400).json({ message: "Invalid student data" });
  }
};
