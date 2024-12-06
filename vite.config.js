import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteImagemin from "vite-plugin-imagemin";

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": "http://localhost:5173",
    },
  },
  plugins: [
    react(),
    viteImagemin({
      optipng: {
        optimizationLevel: 5,
      },
      pngquant: {
        quality: [0.65, 0.8],
      },
      mozjpeg: {
        quality: 75,
      },
      gifsicle: {
        optimizationLevel: 3,
      },
    }),
  ],
});
