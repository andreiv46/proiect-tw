import express from "express";
import { verifyProfessor, verifyStudent } from "../middlewares/auth.js";
import {
  getProfessorFinalRequests,
  createFinalRequest,
  deleteFinalRequest,
  rejectFinalRequest,
  getFinalRequestPdf,
  acceptFinalRequest,
} from "../controllers/finalRequestController.js";
import { uploadStudent, uploadProfessor } from "../config/multer.js";

const finalRequestRoutes = express.Router();

finalRequestRoutes.get(
  "/professor",
  verifyProfessor,
  getProfessorFinalRequests
);

finalRequestRoutes.post(
  "/student",
  uploadStudent.single("cerere"),
  verifyStudent,
  createFinalRequest
);

finalRequestRoutes.delete("/student/delete", deleteFinalRequest);

finalRequestRoutes.patch(
  "/reject/:finalRequestId",
  verifyProfessor,
  rejectFinalRequest
);

finalRequestRoutes.patch(
  "/accept/:finalRequestId",
  uploadProfessor.single("cerere"),
  verifyProfessor,
  acceptFinalRequest
);

finalRequestRoutes.get(
  "/pdf/:finalRequestId",
  verifyProfessor,
  getFinalRequestPdf
);

export default finalRequestRoutes;
