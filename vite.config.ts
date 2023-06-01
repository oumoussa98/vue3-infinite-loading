import path from "path";
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
});
