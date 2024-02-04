import { Server } from "ws";
import http from "http";
import app from "./app";

const server = http.createServer();
const wsServer = new Server({
  server: server,
});

server.on("request", app);
wsServer.on("connection", function connection(ws) {
  ws.on("message", function incoming(message) {
    console.log(`received: ${message}`);

    ws.send(
      JSON.stringify({
        answer: 42,
      })
    );
  });
});

export default server;
