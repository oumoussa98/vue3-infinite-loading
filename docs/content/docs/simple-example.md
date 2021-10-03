---
description: ""
sidebar: "docs"
prev: "/docs/installation/"
next: "/docs/props/"
---

# Simple example

Where going to create a simple example using vite and vuejs 3

I'v already made a live demo [Live Demo Netlify](https://vue3-infinite-loading-demo.netlify.com/)

#### create a new project

```bash
 npm init vite@latest infinite-demo --template vue
```

```bash
cd infinite-demo && npm install
```

#### Install our infinite loading component

```bash
npm install v3-infinite-loading
```

#### Implementation

Go to App.vue component and override the script with this one
We're using [{JSON} Placeholder API](https://jsonplaceholder.typicode.com/) to get some dummy data

```html
<script setup>
  import { ref } from "vue";
  import InfiniteLoading from "v3-infinite-loading";
  import "v3-infinite-loading/lib/style.css";

  let comments = ref([]);
  let page = 1;
  const load = async $state => {
    console.log("loading...");

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/comments?_limit=10&_page=" + page
      );
      const json = await response.json();
      if (json.length < 10) $state.complete();
      else {
        comments.value.push(...json);
        $state.loaded();
      }
      page++;
    } catch (error) {
      $state.error();
    }
  };
</script>
```

Now let's add a template to display the results

```html
<template>
  <div class="result" v-for="comment in comments" :key="comment.id">
    <div>{{ comment.email }}</div>
    <div>{{ comment.id }}</div>
  </div>
  <InfiniteLoading :comments="comments" @infinite="load" />
</template>
```

Lets add a bit of css style

```html
<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  .result {
    display: flex;
    flex-direction: column;
    gap: 5px;
    font-weight: 300;
    width: 400px;
    padding: 10px;
    text-align: center;
    margin: 0 auto 10px auto;
    background: #eceef0;
    border-radius: 10px;
  }
</style>
```

Start the dev server

```bash
npm run dev
```

And congrats you made it 🎉
