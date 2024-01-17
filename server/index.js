import { PORT } from "./config/constants.js";
import http from "http";
import { setupSocket } from "./config/io.js";
import app from "./config/app.js";

const httpServer = http.createServer(app);
const io = setupSocket(httpServer);
app.set("io", io);

httpServer.listen(PORT, () => {
  console.log(`SERVER LISTENING AT http://localhost:${PORT}`);
});
