import { defineConfig } from "vite";
import commonjs from "@rollup/plugin-commonjs";

export default defineConfig({
  plugins: [
    commonjs({
      namedExports: {
        "hoist-non-react-statics": ["default"],
      },
    }),
  ],
  optimizeDeps: {
    include: ["framer-motion", "hoist-non-react-statics"],
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
