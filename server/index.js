const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Maaaai" });
});

app.listen(port, () => {
  console.log(`SERVER LISTENING AT http://localhost:${port}`);
});
