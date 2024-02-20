import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";
import fs from "fs";

// https://vitejs.dev/config/
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
            src: "assets/images/icon/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "assets/images/icon/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "robots.txt", "manifest.json", "icons/*"],
    }),
    react(),
  ],
  server: {
    https: {
      key: fs.readFileSync("./.cert/cert.key"),
      cert: fs.readFileSync("./.cert/cert.crt"),
    },
  },
});
