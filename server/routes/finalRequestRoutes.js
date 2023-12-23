import express from "express";
import { verifyProfessor, verifyStudent } from "../middlewares/auth.js";
import {
  getProfessorFinalRequests,
  createFinalRequest,
} from "../controllers/finalRequestController.js";

const finalRequestRoutes = express.Router();

finalRequestRoutes.get(
  "/professor",
  verifyProfessor,
  getProfessorFinalRequests
);
finalRequestRoutes.post("/student/create", verifyStudent, createFinalRequest);

export default finalRequestRoutes;
