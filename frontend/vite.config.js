// https://vitejs.dev/config/
import { defineConfig } from "vite";
import commonjs from "@rollup/plugin-commonjs";

export default defineConfig({
  plugins: [commonjs()],
  optimizeDeps: {
    include: ["framer-motion"],
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000", // Backend API server
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
