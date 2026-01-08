import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      'supercriminally-ununified-arnoldo.ngrok-free.dev'
    ]
  }
})
