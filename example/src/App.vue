<script setup>
import { ref, nextTick } from "vue";
import Top from "./components/Top.vue";
import Bottom from "./components/Bottom.vue";
import Checkbox from "./components/Checkbox.vue";

let page = 0;
let mount = ref(true);
let resetData = ref(false);
let target = ref(".bottom-results");
let distance = ref(100);
let top = ref(false);
let comments = ref([]);
let mountname = ref("Unmount");

const refresh = () => {
  page = 0;
  comments.value.length = 0;
  resetData.value = !resetData.value;
};

const reset = () => {
  target.value = ".bottom-results";
  distance.value = 100;
  top.value = false;
  mount.value = true;
  mountname.value = "Unmount";
  refresh();
};

const mountToggler = async () => {
  mount.value = !mount.value;
  if (!mount.value) mountname.value = "Mount";
  else mountname.value = "Unmount";
};

const targetToggler = async () => {
  top.value = false;
  if (target.value) target.value = false;
  else if (top.value) target.value = ".top-results";
  else if (!top.value) target.value = ".bottom-results";
  mountToggler();
  await nextTick();
  mountToggler();
  refresh();
};

const topToggler = async () => {
  top.value = !top.value;
  if (top.value) target.value = ".top-results";
  else target.value = ".bottom-results";
  refresh();
};

const distanceHandler = async () => {
  refresh();
};

const load = async $state => {
  console.log("loading more...");
  page++;
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/comments?_limit=5&_page=" + page
    );
    const json = await response.json();
    if (json.length < 5) $state.complete();
    else {
      if (!top.value) comments.value.push(...json);
      else comments.value.unshift(...json);
      $state.loaded();
    }
  } catch (error) {
    $state.error();
  }
};
</script>

<template>
  <div class="settings">
    <a target="_blank" href="https://github.com/oumoussa98/vue3-infinite-loading/tree/main/example">
      <img src="./assets/github.svg" alt="github icon" />
    </a>
    <span class="props">
      <Checkbox :checked="top" :disabled="!target" label="top" @click="topToggler"> Top </Checkbox>
      <Checkbox :checked="target" label="target" @click="targetToggler"> Target </Checkbox>
      <div>
        Distance:
        <input
          @change="distanceHandler"
          class="distance"
          v-model.number.lazy="distance"
          type="text"
        />
      </div>
    </span>
    <span class="buttons">
      <button class="btn-mount" @click="mountToggler">{{ mountname }}</button>
      <button class="btn-refresh" @click="refresh">Refresh</button>
      <button class="btn-reset" @click="reset">Reset</button>
    </span>
  </div>
  <div v-if="mount">
    <Top
      v-if="top"
      :distance="distance"
      :comments="comments"
      :identifier="resetData"
      :target="target"
      @infinite="load"
    />
    <Bottom
      v-if="!top"
      :distance="distance"
      :comments="comments"
      :identifier="resetData"
      :target="target"
      @infinite="load"
    />
  </div>
</template>

<style>
* {
  box-sizing: border-box;
}
body {
  background-color: #272727;
  font-family: system-ui, -apple-system;
  font-weight: 400;
  font-size: 15px;
}
#app {
  color: #e9e9e9;
  max-width: 1500px;
  margin: 0 auto 0 auto;
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  text-align: center;
}
.settings {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  height: 15vh;
  max-height: 200px;
  width: 500px;
  max-width: 90vw;
  margin: 0 auto;
  background: #333536;
  border-radius: 10px;
  padding: 10px;
}
.settings a {
  position: absolute;
  top: 4px;
  right: 5px;
}
.props {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}
.distance {
  width: 50px;
  border-radius: 5px;
  padding: 4px 5px;
  outline: none;
  border: none;
  background: #6a6c6d;
  color: inherit;
}
.buttons {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}
.btn-refresh {
  width: 100px;
  font-family: inherit;
  background: transparent;
  color: white;
  padding: 4px 6px 6px 6px;
  border: 2px solid white;
  border-radius: 8px;
  cursor: pointer;
  text-decoration: none;
  outline: none;
}
.btn-reset,
.btn-mount {
  width: 90px;
  font-family: inherit;
  color: white;
  padding: 4px 6px 6px 6px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  text-decoration: none;
  outline: none;
}
.btn-reset {
  background: #e45252;
}
.btn-mount {
  background: #5268e4;
}
.result {
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-weight: 300;
  width: 90%;
  max-width: 300px;
  min-width: 260px;
  padding: 10px;
  text-align: center;
  margin: 0 auto 10px auto;
  background: #101011;
  border-radius: 10px;
}
.results::-webkit-scrollbar-track {
  border-radius: 4px;
  background: #333536;
}
.results::-webkit-scrollbar {
  border-radius: 4px;
  width: 8px;
  background: #7e7e7e;
}
.results::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background: #7e7e7e;
}
</style>
