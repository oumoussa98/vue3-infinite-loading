import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default ({ mode }) => {
  const config = {
    plugins: [vue()],
  };
  if (mode === "lib") {
    config.build = {
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
    };
  }
  return defineConfig(config);
};
