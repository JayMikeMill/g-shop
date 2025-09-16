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
			"@config": path.resolve(__dirname, "./src/config"),
			"@api": path.resolve(__dirname, "./src/api"),
			"@hooks": path.resolve(__dirname, "./src/hooks"),
			"@utils": path.resolve(__dirname, "./src/utils"),
			"@data": path.resolve(__dirname, "./src/data"),
			"@css": path.resolve(__dirname, "./src/css"),
			"@models": path.resolve(__dirname, "../shared/models"),
		}
	},
	server: {
		host: "0.0.0.0", // allow access from phone or other devices
		port: 5000       // change to any port you like
    
	}
})
