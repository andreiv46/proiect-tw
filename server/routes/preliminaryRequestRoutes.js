import express from "express";
import { verifyProfessor, verifyStudent } from "../middlewares/auth.js";
import {
  createPreliminaryRequest,
  acceptPreliminaryRequest,
  rejectPreliminaryRequest,
  getPreliminaryRequests,
} from "../controllers/preliminaryRequestController.js";

const preliminaryRequestRouter = express.Router();

preliminaryRequestRouter.post(
  "/create",
  verifyStudent,
  createPreliminaryRequest
);

preliminaryRequestRouter.post(
  "/accept",
  verifyProfessor,
  acceptPreliminaryRequest
);

preliminaryRequestRouter.post(
  "/reject",
  verifyProfessor,
  rejectPreliminaryRequest
);

preliminaryRequestRouter.get("/student", verifyStudent, getPreliminaryRequests);
preliminaryRequestRouter.get(
  "/professor",
  verifyProfessor,
  getPreliminaryRequests
);

export default preliminaryRequestRouter;
