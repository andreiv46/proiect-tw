import express from "express";
import {
  getStudents,
  getProfessor,
  getFinalRequestFromStudent,
} from "../controllers/professorController.js";
import { verifyProfessor, verifyToken } from "../middlewares/auth.js";

const professorRouter = express.Router();

professorRouter.get("/students", verifyProfessor, getStudents);
professorRouter.get("/:professorId", verifyToken, getProfessor);
professorRouter.get(
  "/final-request/student/:studentId",
  verifyProfessor,
  getFinalRequestFromStudent
);

export default professorRouter;
