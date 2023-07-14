import { defineConfig } from "vite";

export default defineConfig({
  base: "/libass-wasm-vite-example",
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith("subtitles-octopus-worker.wasm")) {
            return `assets/subtitles-octopus-worker.wasm`;
          }

          return `assets/[name]-[hash][extname]`;
        },
      },
    },
  },
});
