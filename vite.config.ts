// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
	plugins: [react()],
	 resolve: {
    alias: {
      "@pages": path.resolve(__dirname, "frontend/src/pages"),
      "@components": path.resolve(__dirname, "frontend/src/components"),
      "@contexts": path.resolve(__dirname, "frontend/src/contexts"),
      "@data": path.resolve(__dirname, "frontend/src/data"),
      "@css": path.resolve(__dirname, "frontend/src/css"),
      "@shared": path.resolve(__dirname, "shared"),
      "@types": path.resolve(__dirname, "shared")
    }
  }
})
