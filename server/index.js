import express from "express";
import cors from "cors";
import authRouter from "./routes/authRoutes.js";
import preliminaryRequestRouter from "./routes/preliminaryRequestRoutes.js";
import enrollmentSessionRouter from "./routes/enrollmentSessionRoutes.js";
import professorRouter from "./routes/professorRoutes.js";
import finalRequestRoutes from "./routes/finalRequestRoutes.js";
import { PORT } from "./config/constants.js";
import { verifyProfessor, verifyStudent } from "./middlewares/auth.js";
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get("/", verifyStudent, (req, res) => {
  res.status(200).json({ message: "Maaaai" });
});

app.use("/auth", authRouter);
app.use("/preliminary-request", preliminaryRequestRouter);
app.use("/enrollment", enrollmentSessionRouter);
app.use("/professor", professorRouter);
app.use("/final-request", finalRequestRoutes);

app.listen(PORT, () => {
  console.log(`SERVER LISTENING AT http://localhost:${PORT}`);
});
