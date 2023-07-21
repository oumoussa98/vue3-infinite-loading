import { fileURLToPath, URL } from "node:url";
import path from "node:path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true,
      include: ["src/components/InfiniteLoading.vue", "src/types.ts"],
    }),
  ],
  build: {
    outDir: "lib",
    rollupOptions: {
      external: ["vue"],
      output: {
        exports: "named",
        globals: {
          vue: "Vue",
        },
      },
    },
    lib: {
      entry: path.resolve(__dirname, "src/components/InfiniteLoading.vue"),
      name: "V3InfiniteLoading",
      formats: ["es", "umd"],
    },
  },
  resolve: {
    alias: {
      "@root": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
