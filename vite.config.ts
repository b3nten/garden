import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import uno from "unocss/vite";
import { presetTypography, presetWind } from "unocss"

export default defineConfig({
  plugins: [
    uno({
      presets: [presetWind(), presetTypography()]
    }),
    react(),
  ],
});
