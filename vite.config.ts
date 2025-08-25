/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom', // ✅ use jsdom so `document` exists
    globals: true,        // ✅ so you don’t have to import `describe`, `it`, etc.
    setupFiles: './src/setupTests.ts', // ✅ run setup before tests
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
})
