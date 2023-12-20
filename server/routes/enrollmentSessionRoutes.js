import express from "express";
import { verifyProfessor, verifyToken } from "../middlewares/auth.js";
import { checkActiveSessions } from "../middlewares/enrollmentSession.js";
import {
  createEnrollmentSession,
  getActiveEnrollmentSessions,
} from "../controllers/enrollmentSessionController.js";

const enrollmentSessionRouter = express.Router();

enrollmentSessionRouter.post(
  "/create",
  verifyProfessor,
  checkActiveSessions,
  createEnrollmentSession
);

enrollmentSessionRouter.get(
  "/sessions/active",
  verifyToken,
  getActiveEnrollmentSessions
);

export default enrollmentSessionRouter;
