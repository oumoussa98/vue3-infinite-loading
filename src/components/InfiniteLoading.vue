<script lang="ts" setup>
import type { Props, Params, State, StateHandler } from "@root/types";
import { onMounted, ref, toRefs, onUnmounted, watch } from "vue";
import { startObserver, getParentEl, isVisible, updateScrollPosition } from "@root/utils";
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
const { top, firstload, distance } = props;
const { identifier, target } = toRefs(props);

const params: Params = {
  infiniteLoading,
  top,
  firstload,
  distance,
  parentEl: null,
  emit() {
    const parentEl = params.parentEl || document.documentElement;
    prevHeight = parentEl.scrollHeight;
    stateHandler.loading();
    emit("infinite", stateHandler);
  },
};

const stateHandler: StateHandler = {
  loading() {
    state.value = "loading";
  },
  async loaded() {
    state.value = "loaded";
    await updateScrollPosition(params, prevHeight);
    if (isVisible(infiniteLoading.value!, params.parentEl)) params.emit();
  },
  async complete() {
    state.value = "complete";
    await updateScrollPosition(params, prevHeight);
    observer?.disconnect();
  },
  error() {
    state.value = "error";
  },
};

function resetObserver() {
  observer?.disconnect();
  observer = startObserver(params);
}

watch(identifier, resetObserver);

onMounted(async () => {
  params.parentEl = await getParentEl(target);
  resetObserver();
});

onUnmounted(() => observer?.disconnect());
</script>

<template>
  <div ref="infiniteLoading" class="v3-infinite-loading">
    <div v-show="state == 'loading'">
      <slot name="spinner">
        <Spinner />
      </slot>
    </div>
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
.v3-infinite-loading {
  width: 100%;
  height: 44px;
}

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
