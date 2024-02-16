import http from "http";
import https from "https";
import fs from "fs";
import path from "path";
import { Server } from "ws";
import app from "./app";
import { USING_HTTPS } from "./envConfig";

let server = null;

try {
  if (USING_HTTPS) {
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

const wsServer = new Server({ server: server });
server.on("request", app);

wsServer.on("connection", (ws, incoming_request) => {
  console.log("Conexión WebSocket establecida.");
});

wsServer.on("error", (error) => {
  console.error("Error en el servidor WebSocket:", error);
});

export default server;
