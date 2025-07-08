import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss()],
  preview: {
    port: 4173,
    strictPort: true,
  },
  server: {
    port: 5173,
    strictPort: true,
    host: true,
    origin: "http://0.0.0.0:5173",
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'assets/index.js',
        assetFileNames: ({ name }) => {
          if (name && name.endsWith('.css')) {
            return 'assets/index.css';
          }
          return 'assets/[name][extname]';
        },
        chunkFileNames: 'assets/[name].js'
      }
    }
  }
});