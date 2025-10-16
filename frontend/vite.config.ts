// vite.config.ts

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { visualizer } from "rollup-plugin-visualizer";
import path from "path";

export default defineConfig({
  base: "/",
  plugins: [
    react(),
    tsconfigPaths(),
    visualizer({
      open: true, // auto open report
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  resolve: {
    alias: {
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@app": path.resolve(__dirname, "./src/app"),
      "@features": path.resolve(__dirname, "./src/features"),
      "@contexts": path.resolve(__dirname, "./src/contexts"),
      "@config": path.resolve(__dirname, "./src/config"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@lib": path.resolve(__dirname, "./src/lib"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@models": path.resolve(__dirname, "./src/models"),
      "@data": path.resolve(__dirname, "./src/data"),
      "@styles": path.resolve(__dirname, "./src/styles"),
      "@api": path.resolve(__dirname, "./src/api"),
      "@ui": path.resolve(__dirname, "./src/components/"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000", // backend
        changeOrigin: true,
        secure: false, // HTTP ok for dev
      },
    },
  },
});
