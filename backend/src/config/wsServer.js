import http from "http";
import https from "https";
import fs from "fs";
import path from "path";
import { Server as WebSocketServer } from "ws";
import app from "./app";
import { USING_HTTPS } from "./envConfig";

let server = null;

if (USING_HTTPS) {
  const CERTS = {
    key: fs.readFileSync(path.join(__dirname, "..", ".cert/cert.key")),
    cert: fs.readFileSync(path.join(__dirname, "..", ".cert/cert.crt")),
  };
  server = https.createServer(CERTS);
} else {
  server = http.createServer();
}

const wsServer = new WebSocketServer({
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
