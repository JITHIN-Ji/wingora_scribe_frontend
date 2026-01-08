import { defineConfig } from 'vite';


const apiTarget = process.env.VITE_API_BASE_URL || 'https://web-application-voice-assitant.onrender.com';

export default defineConfig({
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: apiTarget,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});


