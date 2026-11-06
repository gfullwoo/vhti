import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// During development, /api requests go to the backend (to be built next).
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:4000',
    },
  },
});
