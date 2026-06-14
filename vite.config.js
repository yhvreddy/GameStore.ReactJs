import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite handles local development, hot reload, and production bundling.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5137',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
