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
};

const isVisible = (el, view) => {
  const elRect = el.getBoundingClientRect();
  if (view === window) return elRect.top >= 0 && elRect.bottom <= view.innerHeight;
  const viewRect = view.getBoundingClientRect();
  return elRect.top >= viewRect.top && elRect.bottom <= viewRect.bottom;
};

const getParent = target => {
  let parentEl = window;
  if (target) {
    parentEl = document.querySelector(target);
    if (parentEl === document.body) return window;
  }
  return parentEl || window;
};

// generate event handler
const getEventHandler = params => {
  return () => {
    const scrollTop = params.parentEl.scrollTop || document.documentElement.scrollTop;
    const scrollHeight = params.parentEl.scrollHeight || document.documentElement.scrollHeight;
    const clientHeight = params.parentEl.clientHeight || params.parentEl.innerHeight;
    const validState = params.state.value == "loaded" || params.state.value == "ready";

    if (!validState) return;

    if (params.top && scrollTop - params.distance <= 0) params.emitInfiniteEvent();

    if (!params.top && scrollTop + clientHeight >= scrollHeight - params.distance)
      params.emitInfiniteEvent();
  };
};

// start scroll event
let eventHandler;
const startScrollEvent = params => {
  params.parentEl = getParent(params.target);

  if (isVisible(params.infiniteLoading.value, params.parentEl) && params.firstLoad)
    params.emitInfiniteEvent();

  eventHandler = getEventHandler(params);
  params.parentEl.addEventListener("scroll", eventHandler);
};

// remove scroll event
const removeScrollEvent = parentEl => {
  parentEl.removeEventListener("scroll", eventHandler);
};

export {
  stateHandler,
  infiniteEventEmitter,
  isVisible,
  startScrollEvent,
  removeScrollEvent,
};
