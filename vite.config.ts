import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // The 'spa' appType is crucial for handling client-side routing.
  // It ensures that all deep links are redirected to index.html,
  // allowing React Router to manage the URL. This fixes the 404 error
  // when directly accessing routes like /staff/login in development.
  appType: 'spa',
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
