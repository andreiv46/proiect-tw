import express from "express";
import { getStudents } from "../controllers/professorController.js";
import { verifyProfessor } from "../middlewares/auth.js";

const professorRouter = express.Router();

professorRouter.get("/students", verifyProfessor, getStudents);

export default professorRouter;
