import { Server } from "ws";
import http from "http";
import https from "https";
import fs from "fs";
import path from "path";
import app from "./app";
import { USING_HTTPS } from "./envConfig";

let server = null;

if (USING_HTTPS) {
  const CERTS = () => {
    try {
      return {
        key: fs.readFileSync(path.join(__dirname, "..", ".cert/cert.key")),
        cert: fs.readFileSync(path.join(__dirname, "..", ".cert/cert.crt")),
      };
    } catch (err) {
      console.log("No certificates found: " + err);
    }
  };
  server = https.createServer(CERTS());
} else {
  server = http.createServer();
}

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
