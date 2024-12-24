import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://192.168.2.16:8181',
        changeOrigin: true,
        secure: false,
      },
    },
    port: 5000
  },
});
