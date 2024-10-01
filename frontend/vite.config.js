
// https://vitejs.dev/config/

export default {
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000", // Backend API server
        changeOrigin: true,
        secure: false,
      },
    },
  },
};

