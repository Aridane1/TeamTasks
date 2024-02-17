import http from "http";
import https from "https";
import fs from "fs";
import path from "path";
import { Server as WebSocketServer } from "ws";
import app from "./app";
import { USING_HTTPS } from "./envConfig";
import { startWs } from "../controllers/ws.controller";

let server = null;

try {
  if (USING_HTTPS == "true") {
    const CERTS = {
      key: fs.readFileSync(path.join(__dirname, "..", ".cert/cert.key")),
      cert: fs.readFileSync(path.join(__dirname, "..", ".cert/cert.crt")),
    };
    server = https.createServer(CERTS);
  } else {
    server = http.createServer();
  }
} catch (error) {
  console.error("Error al crear el servidor HTTP/HTTPS:", error);
  process.exit(1);
}

const wsServer = new WebSocketServer({
  server: server,
});

server.on("request", app);

startWs(wsServer);

export default server;
