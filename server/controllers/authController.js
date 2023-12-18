import Student from "../models/student.js";
import Professor from "../models/professor.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_KEY } from "../config/constants.js";

export const registerStudent = async (req, res) => {
  try {
    const { name, email, year, major, studentClass, password } = req.body;

    if (!name || !email || !year || !major || !studentClass || !password) {
      return res.status(400).json({ message: "Malformed request" });
    }

    const studentExists = await Student.findOne({ where: { email } });

    if (studentExists) {
      return res.status(400).json({ message: "Student already exists" });
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
      return res.status(400).json({ message: "Invalid student data" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const registerProfessor = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Malformed request" });
    }

    const professorExists = await Professor.findOne({ where: { email } });

    if (professorExists) {
      return res.status(400).json({ message: "Professor already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newProfessor = await Professor.create({
      name: name,
      email: email,
      hashedPassword: hashedPassword,
    });

    if (newProfessor) {
      res.status(201).json({
        message: "Professor created",
        professorId: newProfessor.professorId,
        name: newProfessor.name,
        email: newProfessor.email,
      });
    } else {
      return res.status(400).json({ message: "Invalid professor data" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Malformed request" });
    }

    const student = await Student.findOne({ where: { email } });

    if (!student) {
      return res.status(400).json({ message: "Student does not exist" });
    }

    const validPassword = await bcrypt.compare(
      password,
      student.hashedPassword
    );

    if (!validPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      {
        id: student.studentId,
        role: "student",
        name: student.name,
        email: student.email,
        year: student.year,
        major: student.major,
        studentClass: student.studentClass,
      },
      JWT_KEY,
      { expiresIn: "1h" }
    );
    return res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const loginProfessor = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Malformed request" });
    }

    const professor = await Professor.findOne({ where: { email } });

    if (!professor) {
      return res.status(400).json({ message: "Professor does not exist" });
    }

    const validPassword = await bcrypt.compare(
      password,
      professor.hashedPassword
    );

    if (!validPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      {
        id: professor.professorId,
        role: "professor",
        name: professor.name,
        email: professor.email,
      },
      JWT_KEY,
      { expiresIn: "1h" }
    );
    return res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
