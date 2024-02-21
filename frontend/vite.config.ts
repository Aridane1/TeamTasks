// Importa defineConfig desde 'vitest/config' para configuración de pruebas
import { defineConfig } from 'vitest/config';
// Importa los plugins necesarios de Vite
import react from '@vitejs/plugin-react-swc'; // Plugin para React usando SWC
import { VitePWA } from 'vite-plugin-pwa'; // Plugin para Progressive Web App
import fs from 'fs'; // Módulo de Node.js para operaciones con el sistema de archivos

// Configuración de Vite
export default defineConfig({
  // Configura los plugins a utilizar
  plugins: [
    // Configuración del plugin de React usando SWC
    react(),
    // Configuración de Progressive Web App (PWA)
    VitePWA({
      manifest: {
        // Configuración del manifest de la PWA
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
      includeAssets: ["favicon.ico", "robots.txt", "safari-pinned-tab.svg", "assets/images/icon/*"], // Asegúrate de incluir todos los assets relevantes
    }),
  ],
  // Configuración del servidor de desarrollo
  server: {
    https: {
      key: fs.readFileSync('./.cert/cert.key'), // Ruta al archivo de clave privada para HTTPS
      cert: fs.readFileSync('./.cert/cert.crt'), // Ruta al archivo de certificado para HTTPS
    },
  },
  // Configuración de Vitest para pruebas
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setupTests.ts',
    coverage: {
      // Configuración para generar reportes de cobertura
      provider: 'v8', // Utiliza c8 como el proveedor de cobertura, que es el predeterminado para Vitest
      reporter: ['text', 'html'], // Define los formatos del reporte; por ejemplo, texto en consola y un reporte HTML
      // Puedes incluir más configuraciones específicas de cobertura aquí, como excluir archivos
    },
  },
});
