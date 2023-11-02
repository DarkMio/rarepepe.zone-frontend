import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
// import eslint from "vite-plugin-eslint";
import svgrPlugin from "vite-plugin-svgr";
import viteTsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  // plugins: [react(), eslint(), viteTsconfigPaths(), svgrPlugin()],
  plugins: [react(), viteTsconfigPaths(), svgrPlugin()],
  build: {
    outDir: "build",
  },
  server: {
    host: "127.0.0.1",
    port: 3001,
    proxy: {
      "^/api/.*": {
        target: "http://localhost:3000",
        secure: false,
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, "")
      }
    }
  },
  
});
