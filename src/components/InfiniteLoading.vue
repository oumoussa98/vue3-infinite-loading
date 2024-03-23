<script lang="ts" setup>
import type { Props, State, StateHandler } from "@root/types";
import { onMounted, ref, toRefs, onUnmounted, watch, nextTick } from "vue";
import { getParentEl, isVisible } from "@root/utils";
// @ts-ignore
import Spinner from "./Spinner.vue";

const emit = defineEmits<{ infinite: [$state: StateHandler] }>();
const props = withDefaults(defineProps<Props>(), {
  top: false,
  firstload: true,
  distance: 0,
});
defineSlots<{
  spinner(props: {}): any;
  complete(props: {}): any;
  error(props: { retry(): void }): any;
}>();

let observer: IntersectionObserver | null = null;
let prevHeight = 0;
const infiniteLoading = ref(null);
const state = ref<State>("");
const { top, distance } = props;
let { firstload } = props;
const { identifier, target } = toRefs(props);

let parentEl: HTMLElement | null = null;

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
    const parent = parentEl || document.documentElement;
    await nextTick();
    if (top) parent.scrollTop = parent.scrollHeight - prevHeight;
    if (isVisible(infiniteLoading.value!, parentEl)) loadMore();
  },
  complete() {
    state.value = "complete";
    observer?.disconnect();
  },
  error() {
    state.value = "error";
  },
};

watch(identifier, () => {
  observer?.disconnect();
  observer = startObserver();
});

onMounted(async () => {
  parentEl = await getParentEl(target!);
  observer = startObserver();
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
        if (firstload) loadMore();
        firstload = true;
      }
    },
    { root: parentEl, rootMargin }
  );
  observer.observe(infiniteLoading.value!);
  return observer;
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
