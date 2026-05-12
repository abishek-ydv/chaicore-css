import { defineConfig } from "vite";

export default defineConfig({
  build: {
    emptyOutDir: true,
    lib: {
      entry: {
        chaicorecss: "lib/chai-core-css.js",
        auto: "lib/auto.js",
      },
      formats: ["es"],
    },
    outDir: "dist-package",
    rollupOptions: {
      output: {
        entryFileNames: "[name].js",
      },
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
  },
});
