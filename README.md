## Intro

An infinite scroll component compatible with Vue.js 3 and vite, to help you implement an infinite scroll list more easily.

## Features

- Lightweight and simple to use
- Internal spinner
- 2-directional support (Top and bottom)

## Install

```Bash
npm install v3-infinite-loading
```

## Basic usage

register globally:

```JavaScript
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css"; //required if you're going to use the built in spinner

const app = createApp(App);

app.component("infinite-loading", InfiniteLoading);

app.mount("#app");
```

usage in SFC with script setup:

```html
<script setup>
  import InfiniteLoading from "v3-infinite-loading";
  import "v3-infinite-loading/lib/style.css"; //if you're going to use the built in spinner
</script>

<template>
  <InfiniteLoading />
</template>
```

## Usage & Guide

Documentation available on [Vue3-infinite-loading netlify](https://vue3-infinite-loading.netlify.com/)

Check out live demo [Vue3-infinite-loading-demo netlify](https://vue3-infinite-loading-demo.netlify.com/)

## Changelog

Detailed changes for each release are documented in the [release notes](https://github.com/oumoussa98/vue3-infinite-loading/releases).

## Contribution

Comming soon

## Licence

The MIT License (MIT)
