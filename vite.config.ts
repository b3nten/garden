import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import uno from "unocss/vite";

export default defineConfig({
  plugins: [
    uno(),
    react(),
  ],
});
