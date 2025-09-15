// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
	plugins: [react()],
	 resolve: {
    alias: {
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@contexts": path.resolve(__dirname, "./src/contexts"),
      "@data": path.resolve(__dirname, "./src/data"),
      "@css": path.resolve(__dirname, "./src/css"),
      "@models": path.resolve(__dirname, "../shared/models"),
    }
  }
})
