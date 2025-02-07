import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://apsis.kocaeli.edu.tr',
        changeOrigin: true,
        secure: false,
      },
    },
    port: 5000
  },
});
