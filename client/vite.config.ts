import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
      '/images': 'http://localhost:3000',
      '/ws-chat': { ws: true, target: 'ws://localhost:3000', rewriteWsOrigin: true },
    },
  },
  build: {
    outDir: '../server/dist',
  },
  base: '/',
});
