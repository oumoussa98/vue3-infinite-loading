---
description: ""
sidebar: "docs"
prev: "/docs/"
next: "/docs/simple-example/"
---

# Installation

```Bash
npm install v3-infinite-loading
```

## Basic usage

##### register globally

```js
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css"; //required if you're not going to override default slots

const app = createApp(App);

app.component("infinite-loading", InfiniteLoading);

app.mount("#app");
```

##### usage in SFC with script setup

```html
<script setup>
  import InfiniteLoading from "v3-infinite-loading";
  import "v3-infinite-loading/lib/style.css"; //required if you're not going to override default slots

  const loadData = ($state) {
      //calling the api
  }
</script>

<template>
  <InfiniteLoading @infinite="loadData" />
</template>
```
