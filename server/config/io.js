import { Server } from "socket.io";

export let users = {};

export const setupSocket = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    console.log(`User ${userId} connected`);

    users[userId] = socket.id;

    socket.on("disconnect", () => {
      console.log(`User ${userId} disconnected`);
      delete users[userId];
    });
  });

  return io;
};
