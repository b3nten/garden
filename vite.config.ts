import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import uno from "unocss/vite"
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uno(), react()],
})
