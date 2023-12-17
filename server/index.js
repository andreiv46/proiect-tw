import express from "express";
import cors from "cors";
import accountRouter from "./routes/accountRoutes.js";
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Maaaai" });
});

app.use("/account", accountRouter);

app.listen(port, () => {
  console.log(`SERVER LISTENING AT http://localhost:${port}`);
});
