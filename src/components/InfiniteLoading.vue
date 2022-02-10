<script setup>
import { onMounted, ref, toRefs, onUnmounted, watch } from "vue";

import Spinner from "./Spinner.vue";
import {
  startScrollEvent,
  stateHandler,
  removeScrollEvent,
  infiniteEventEmitter,
} from "../utils.js";

const props = defineProps({
  top: { type: Boolean, required: false },
  target: { type: [String, Boolean], required: false },
  distance: { type: Number, required: false, default: 100 },
  identifier: { required: false },
  firstLoad: { type: Boolean, required: false, default: true },
  slots: { type: Object, required: false },
});

const emit = defineEmits(["infinite"]);

const state = ref("");
const { top, target, distance, firstLoad, slots } = props;
const { identifier } = toRefs(props);

const params = {
  state,
  target,
  distance,
  top,
  firstLoad,
  emitInfiniteEvent: infiniteEventEmitter(emit, stateHandler(state)),
};

const stateWatcher = (el, prevHeight) =>
  watch(state, newVal => {
    if (newVal == "loaded" && top) {
      Promise.resolve().then(() => {
        el.scrollTop = el.scrollHeight - prevHeight;
      });
      prevHeight = el.scrollHeight;
    }
    if (newVal == "complete") removeScrollEvent(params);
  });

const identifierWatcher = () =>
  watch(identifier, () => {
    state.value = "";
    removeScrollEvent(params);
    startScrollEvent(params);
  });

onMounted(() => {
  startScrollEvent(params);
  let el = document.querySelector(target) || document.documentElement;
  let prevHeight = el.scrollHeight;
  stateWatcher(el, prevHeight);
  if (identifier) identifierWatcher();
});

onUnmounted(() => {
  removeScrollEvent(params);
});
</script>

<template>
  <div id="vue3-infinite-loading">
    <slot v-if="state == 'loading'" name="spinner">
      <Spinner />
    </slot>
    <slot v-if="state == 'complete'" name="complete">
      <span> {{ slots?.complete || "No more results!" }} </span>
    </slot>
    <slot v-if="state == 'error'" name="error" :retry="params.emitInfiniteEvent">
      <span class="state-error">
        <span>{{ slots?.error || "Oops something went wrong!" }}</span>
        <button class="retry" @click="params.emitInfiniteEvent">retry</button>
      </span>
    </slot>
  </div>
</template>

<style>
.state-error {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.retry {
  margin-top: 8px;
  padding: 2px 6px 4px 6px;
  width: 60px;
  color: inherit;
  font-size: 14px;
  font-family: inherit;
  background: transparent;
  border: 2px solid currentColor;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
}
.retry:hover {
  opacity: 0.8;
}
</style>
