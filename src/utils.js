const stateHandler = state => ({
  loading() {
    state.value = "loading";
  },
  loaded() {
    state.value = "loaded";
  },
  complete() {
    state.value = "complete";
  },
  error() {
    state.value = "error";
  },
});

const infiniteEventEmitter = (emit, stateHandler) => {
  return () => {
    stateHandler.loading();
    emit("infinite", stateHandler);
  };
}

const isVisible = (el, view) => {
  const rect = el.getBoundingClientRect();
  return (rect.top >= 0 && rect.bottom <= view.clientHeight);
}

// generate event handler
const getEventHandler = (el, { state, distance, emitInfiniteEvent, top }) => {
  return () => {
    const { scrollTop, scrollHeight, clientHeight } = el;
    const validState = state.value == "loaded" || !state.value;

    if (top && Math.ceil(scrollTop) - distance <= 0 && validState) emitInfiniteEvent();
    if (!top && Math.ceil(scrollTop) + clientHeight >= scrollHeight - distance && validState)
      emitInfiniteEvent();
  };
};
// start scroll event
let eventHandler;
const startScrollEvent = params => {
  if (params.target && !document.querySelector(params.target))
    return console.error("Vue3 infinite loading: target prop should be a valid css selector");

  const el = document.querySelector(params.target) || document.documentElement;
  const target = document.querySelector(params.target) || window;

  const infiniteLoading = params.vue3InfiniteLoading.value;
  if (isVisible(infiniteLoading, el) && params.firstLoad) params.emitInfiniteEvent();

  eventHandler = getEventHandler(el, params);
  target.addEventListener("scroll", eventHandler);
};
// remove scroll event
const removeScrollEvent = params => {
  const target = document.querySelector(params.target) || window;
  target.removeEventListener("scroll", eventHandler);
};

export { stateHandler, infiniteEventEmitter, isVisible, startScrollEvent, removeScrollEvent };
