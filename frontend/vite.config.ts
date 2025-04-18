import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": {
        target: `http://localhost:5000`,
        changeOrigin: true,
        secure: false
      }
    }
  },
  build: {
    outDir: path.resolve(__dirname, '../backend/react-dist'),
    emptyOutDir: true, // optional, clears the folder before build
  }, 
})
