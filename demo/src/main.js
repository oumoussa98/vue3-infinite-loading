import { createApp } from "vue";
import App from "./App.vue";

import InfiniteLoading from "@root/components/InfiniteLoading.vue";

const app = createApp(App);

if (import.meta.env.MODE === "production") {
  const modules = import.meta.glob("../lib/v3-infinite-loading.es.js", { eager: true });
  import.meta.glob("../lib/style.css", { eager: true });
  const InfiniteLoadingProd = modules["../lib/v3-infinite-loading.es.js"].default;
  app.component("InfiniteLoading", InfiniteLoadingProd);
} else app.component("InfiniteLoading", InfiniteLoading);

app.mount("#app");
