import { defineConfig } from "vite";

export default defineConfig({
  define: {
    "process.env": {},
  },
  optimizeDeps: {
    include: ["@emotion/react", "framer-motion", "hoist-non-react-statics"],
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
