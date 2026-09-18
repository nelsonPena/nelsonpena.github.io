import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // This repository is the account site: https://nelsonpena.github.io/.
  base: '/',
  server: { host: '127.0.0.1' },
  preview: { host: '127.0.0.1' },
})
