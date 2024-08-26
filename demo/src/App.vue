<script setup>
import { ref, nextTick } from "vue";
import Top from "./components/Top.vue";
import Bottom from "./components/Bottom.vue";
import Checkbox from "./components/Checkbox.vue";
import ScopedLoader from "./components/ScopedLoader.vue";

const counts = [20, 50, 100, 120, 150, 200, 250, 300, 350, 400, 450, 500];
const showLoaders = ref(false);
const displayMessage = ref("Display");
let page = 0;
let mount = ref(true);
let resetData = ref(false);
let target = ref(".bottom-results");
let distance = ref(0);
let top = ref(false);
let comments = ref([]);
let mountname = ref("Unmount");

const displayMultipleLoader = () => {
  showLoaders.value = !showLoaders.value;
  displayMessage.value = showLoaders.value ? "Hide" : "Display";
};
const refresh = () => {
  page = 0;
  comments.value.length = 0;
  resetData.value = !resetData.value;
};
const reset = () => {
  target.value = ".bottom-results";
  distance.value = 0;
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
  mountToggler();
  await nextTick();
  mountToggler();
  refresh();
};
const distanceHandler = async () => {
  mountToggler();
  await nextTick();
  mountToggler();
  refresh();
};

const limit = 200;
const load = async $state => {
  console.log("loading more...");
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/comments?_limit=${limit}&_page=${++page}`
    );
    const json = await response.json();
    if (json.length) {
      if (!top.value) comments.value.push(...json);
      else comments.value.unshift(...json.reverse());
      $state.loaded();
    }

    if (json.length < limit) $state.complete();
  } catch (error) {
    $state.error();
  }
};
</script>

<template>
  <div class="settings">
    <a
      target="_blank"
      href="https://github.com/oumoussa98/vue3-infinite-loading/tree/main/demo"
    >
      <img src="./assets/github.svg" alt="github icon" />
    </a>
    <span class="props">
      <Checkbox :checked="top" :disabled="!target" label="top" @click="topToggler">
        Top
      </Checkbox>
      <Checkbox :checked="target" label="target" @click="targetToggler">
        Target
      </Checkbox>
      <div>
        Distance:
        <input
          v-model.number.lazy="distance"
          class="distance"
          type="text"
          @change="distanceHandler"
        />
      </div>
    </span>
    <span class="buttons">
      <button class="btn btn-mount" @click="mountToggler">{{ mountname }}</button>
      <button class="btn-refresh" @click="refresh">Refresh</button>
      <button class="btn btn-reset" @click="reset">Reset</button>
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
  <button class="btn btn-show-loaders" @click="displayMultipleLoader">
    {{ displayMessage }} multiple infinites
  </button>
  <div v-if="showLoaders" class="loaders">
    <ScopedLoader v-for="i in counts" :key="i" :count="i" class="results" />
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
  overflow-y: scroll;
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

.btn {
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

.btn-show-loaders {
  background: #5268e4;
  width: 180px;
  height: 30px;
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

.loader {
  padding: 10px;
}

.loaders {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}

.loaders > .results {
  width: 300px;
  height: 300px;
  background: #333536;
  overflow-y: scroll;
}

::-webkit-scrollbar-track {
  border-radius: 4px;
  background: #333536;
}

::-webkit-scrollbar {
  border-radius: 4px;
  width: 8px;
  background: #7e7e7e;
}

::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background: #7e7e7e;
}
</style>
