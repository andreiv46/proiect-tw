import express from "express";
import { verifyProfessor, verifyStudent } from "../middlewares/auth.js";
import { verifyAssignedProfessor } from "../middlewares/preliminaryRequest.js";
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
  verifyAssignedProfessor,
  createPreliminaryRequest
);

preliminaryRequestRouter.patch(
  "/accept",
  verifyProfessor,
  acceptPreliminaryRequest
);

preliminaryRequestRouter.patch(
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
