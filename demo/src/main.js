import { createApp } from "vue";
import App from "./App.vue";

import InfiniteLoading from "../../src/components/InfiniteLoading.vue";

const app = createApp(App);

if (import.meta.env.MODE === "production") {
  const modules = import.meta.glob("../lib/v3-infinite-loading.mjs", { eager: true });
  import.meta.glob("../lib/style.css", { eager: true })
  const InfiniteLoadingProd = modules["../lib/v3-infinite-loading.mjs"].default;
  app.component("infinite-loading", InfiniteLoadingProd);
} else app.component("infinite-loading", InfiniteLoading);

app.mount("#app");
