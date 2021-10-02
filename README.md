## Intro

An infinite scroll component compatible with vue.js 3 and vite, to help you implement an infinite scroll list more easily.

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
import "v3-infinite-loading/lib/style.css"; //required if you're not going to override default slots

const app = createApp(App);

app.component("infinite-loading", InfiniteLoading);

app.mount("#app");
```

usage in SFC with script setup:

```html
<script setup>
  import InfiniteLoading from "v3-infinite-loading";
  import "v3-infinite-loading/lib/style.css"; //required if you're not going to override default slots
</script>

<template>
  <InfiniteLoading />
</template>
```

## Usage & Guide

Documentation available on [v3-infinite-loading Netlify](https://vue3-infinite-loading.netlify.com/)

Check out live demo [v3-infinite-loading-demo Netlify](https://vue3-infinite-loading-demo.netlify.com/)

## Changelog

Detailed changes for each release are documented in the [release notes](https://github.com/oumoussa98/vue3-infinite-loading/releases).

## Contribution

Comming soon

## Licence

The MIT License (MIT)
