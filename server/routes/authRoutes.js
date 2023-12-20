import express from "express";
import {
  registerStudent,
  registerProfessor,
  loginStudent,
  loginProfessor,
  validateUserToken,
} from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/student/register", registerStudent);
authRouter.post("/professor/register", registerProfessor);
authRouter.post("/student/login", loginStudent);
authRouter.post("/professor/login", loginProfessor);
authRouter.post("/validateToken", validateUserToken);


export default authRouter;
