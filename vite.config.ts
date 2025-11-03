import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  base: "/", // Ensures assets load correctly after deployment
  build: {
    outDir: "dist/spa", // Matches your Netlify publish directory
    emptyOutDir: true,  // Clears the old build before new one
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
  server: {
    port: 5173, 
    open: true, 
  },
});
