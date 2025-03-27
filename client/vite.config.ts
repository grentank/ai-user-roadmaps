import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler', { target: '18' }]],
      },
    }),
  ],
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
