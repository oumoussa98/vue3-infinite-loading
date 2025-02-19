<script lang="ts" setup>
import type { Props, State, StateHandler } from "@root/types";
import { onMounted, ref, toRefs, onUnmounted, watch, nextTick } from "vue";
import { getParentEl, isVisible } from "@root/utils";

import Spinner from "./Spinner.vue";

const emit = defineEmits<{ infinite: [$state: StateHandler] }>();
const props = withDefaults(defineProps<Props>(), {
  top: false,
  firstload: true,
  distance: 0,
  manualload: false,
});

defineSlots<{
  spinner(props: {}): any;
  complete(props: {}): any;
  error(props: { retry(): void }): any;
  loadMore(props: { load(): void }): any;
}>();

let observer: IntersectionObserver | null = null;
let prevHeight = 0;
const infiniteLoading = ref(null);
const state = ref<State>("");
const { top, distance } = props;
let { firstload } = props;
const { identifier, target } = toRefs(props);

let parentEl: Element | null = null;

function loadMore() {
  const parent = parentEl || document.documentElement;
  prevHeight = parent.scrollHeight;
  stateHandler.loading();
  emit("infinite", stateHandler);
}

const stateHandler: StateHandler = {
  loading() {
    state.value = "loading";
  },
  async loaded() {
    state.value = "loaded";
    await updateScrollPosition();
    if (isVisible(infiniteLoading.value!, parentEl)) loadMore();
  },
  async complete() {
    state.value = "complete";
    await updateScrollPosition();
    observer?.disconnect();
  },
  error() {
    state.value = "error";
  },
};

watch(identifier, resetObserver);

watch(
  () => props.manualload,
  async () => {
    if (!props.manualload) {
      await nextTick();
      // If manual load is disabled, immediately load more if the element is visible
      if (isVisible(infiniteLoading.value!, parentEl)) loadMore();
    }
  }
);

onMounted(async () => {
  parentEl = await getParentEl(target!);
  resetObserver();

  if (props.manualload && firstload) loadMore();
});

onUnmounted(() => {
  observer?.disconnect();
});

function startObserver() {
  let rootMargin = `0px 0px ${distance}px 0px`;
  if (top) rootMargin = `${distance}px 0px 0px 0px`;
  const observer = new IntersectionObserver(
    entries => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        if (props.manualload) return;
        if (firstload) loadMore();
        firstload = true;
      }
    },
    { root: parentEl, rootMargin }
  );
  observer.observe(infiniteLoading.value!);
  return observer;
}

function resetObserver() {
  observer?.disconnect();
  observer = startObserver();
}

async function updateScrollPosition() {
  await nextTick();
  if (!top) return;
  const parent = parentEl || document.documentElement;
  parent.scrollTop = parent.scrollHeight - prevHeight;
}
</script>

<template>
  <div ref="infiniteLoading" style="min-height: 1px">
    <div v-show="state == 'loading'">
      <slot name="spinner">
        <Spinner />
      </slot>
    </div>
    <slot v-if="state == 'complete'" name="complete">
      <span> {{ slots?.complete || "No more results!" }} </span>
    </slot>
    <slot v-if="state == 'error'" name="error" :retry="loadMore">
      <span class="state-error">
        <span>{{ slots?.error || "Oops something went wrong!" }}</span>
        <button class="retry" @click="loadMore">retry</button>
      </span>
    </slot>
    <slot
      v-if="props.manualload && (state == 'loaded' || state == '')"
      name="loadMore"
      :load="loadMore"
    >
      <button class="retry" @click="loadMore">Load More</button>
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
