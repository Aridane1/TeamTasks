import { defineConfig, createServer as createViteServer } from "vite";
import https from "https";
import fs from "fs";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    VitePWA({
      manifest: {
        name: "Mi aplicación",
        short_name: "MiApp",
        start_url: "/",
        display: "standalone",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        icons: [
          {
            src: "/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "robots.txt", "manifest.json", "icons/*"],
    }),
  ],
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
