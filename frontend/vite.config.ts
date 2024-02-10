import { defineConfig, createServer as createViteServer } from "vite";
import https from "https";
import fs from "fs";

export default defineConfig({
  server: {
    https: {
      key: fs.readFileSync("./.cert/cert.key"),
      cert: fs.readFileSync("./.cert/cert.crt"),
    },
  },
});

export const createServer = (options) => {
  return https.createServer(
    {
      key: fs.readFileSync("./.cert/cert.key"),
      cert: fs.readFileSync("./.cert/cert.crt"),
    },
    createViteServer(options)
  );
};
