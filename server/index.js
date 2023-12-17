const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Maaaai" });
});

app.listen(port, () => {
  console.log(`SERVER LISTENING AT http://localhost:${port}`);
});
