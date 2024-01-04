import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import uno from "unocss/vite";
import { presetTypography, presetWind } from "unocss"
import vono from "@gaiiaa/vono"

export default defineConfig({
  plugins: [
    uno({
      presets: [presetWind(), presetTypography()]
    }),
    react(),
    vono({
      prerender: {
        routes: [
          "/", "/blog"
        ]
      }
    })
  ],
  build: {
    target: "esnext",
    rollupOptions: {
      input: {
        ui: "ui/entry.tsx"
      }
    }
  }
});
