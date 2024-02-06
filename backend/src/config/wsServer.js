import { Server } from "ws";
import { createServer } from "http";
import app from "./app";

const server = createServer();
const wsServer = new Server({
  server: server,
});

const connections = [];

server.on("request", app);

wsServer.on("connection", (socket) => {
  console.log("Client connected.");

  connections.push(socket);

  socket.on("message", (message) => {
    const textMessage = message.toString("utf-8");

    connections.forEach((conn) => {
      if (conn.readyState === socket.OPEN) {
        conn.send(textMessage);
      }
    });
  });

  socket.on("close", () => {
    console.log("Client disconnected.");

    const index = connections.indexOf(socket);
    if (index > -1) {
      connections.splice(index, 1);
    }
  });
});
export default server;
