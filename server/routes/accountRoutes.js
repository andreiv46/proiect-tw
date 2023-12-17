import express from "express";
import { registerStudent } from "../controllers/accountController.js";

const accountRouter = express.Router();

accountRouter.post("/register-student", registerStudent);

export default accountRouter;
