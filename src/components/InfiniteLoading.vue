<script setup>
import Spinner from "./Spinner.vue";
import { onMounted, ref, toRefs, onUnmounted, watch, nextTick } from "vue";

import {
  startObserver,
  stopObserver,
  stateHandler,
  initEmitter,
  isVisible,
} from "../utils.js";

const emit = defineEmits(["infinite"]);
const props = defineProps({
  top: { type: Boolean, required: false },
  target: { type: [String, Boolean], required: false },
  distance: { type: Number, required: false, default: 0 },
  identifier: { required: false },
  firstload: { type: Boolean, required: false, default: true },
  slots: { type: Object, required: false },
});

const infiniteLoading = ref(null);
const state = ref("ready");
const { top, firstload, target, distance } = props;
const { identifier } = toRefs(props);

const params = {
  infiniteLoading,
  target,
  top,
  firstload,
  distance,
  emit: initEmitter(emit, stateHandler(state)),
  parentEl: null,
};

const stateWatcher = () =>
  watch(state, async newVal => {
    const parentEl = params.parentEl || document.documentElement;
    const prevHeight = parentEl.scrollHeight;
    await nextTick();
    if (newVal == "loaded" && top)
      parentEl.scrollTop = parentEl.scrollHeight - prevHeight;
    if (newVal == "loaded" && isVisible(infiniteLoading.value, params.parentEl))
      params.emit();
    if (newVal == "complete") stopObserver();
  });

const identifierWatcher = () =>
  watch(identifier, () => {
    state.value = "ready";
    stopObserver();
    startObserver(params);
  });

onMounted(() => {
  startObserver(params);
  stateWatcher();
  if (identifier) identifierWatcher();
});

onUnmounted(() => {
  stopObserver();
});
</script>

<template>
  <div ref="infiniteLoading">
    <slot v-if="state == 'loading'" name="spinner">
      <Spinner />
    </slot>
    <slot v-if="state == 'complete'" name="complete">
      <span> {{ slots?.complete || "No more results!" }} </span>
    </slot>
    <slot v-if="state == 'error'" name="error" :retry="params.emit">
      <span class="state-error">
        <span>{{ slots?.error || "Oops something went wrong!" }}</span>
        <button class="retry" @click="params.emit">retry</button>
      </span>
    </slot>
  </div>
</template>

<style scoped>
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
