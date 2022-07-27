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

let emit;
const initEmitter = (emit, stateHandler) => {
  return () => {
    stateHandler.loading();
    emit("infinite", stateHandler);
  };
};

const isVisible = (el, view) => {
  const elRect = el.getBoundingClientRect();
  if (!view) return elRect.top >= 0 && elRect.bottom <= window.innerHeight;
  const viewRect = view.getBoundingClientRect();
  return elRect.top >= viewRect.top && elRect.bottom <= viewRect.bottom;
};

const getScrollHeight = el => {
  return el?.scrollHeight || document.documentElement.scrollHeight;
};

let load = true;
const intersect = entries => {
  const entry = entries[0];
  if (entry.isIntersecting) {
    if (load) emit();
    load = true;
  }
};

let observer;
const startObserver = params => {
  params.parentEl = document.querySelector(params.target) || null;
  emit = params.emit;
  const options = { root: params.parentEl }
  observer = new IntersectionObserver(intersect, options);
  if (!params.firstLoad) load = false;
  observer.observe(params.infiniteLoading.value);
};

const stopObserver = () => {
  observer.disconnect();
};

export {
  startObserver,
  stopObserver,
  stateHandler,
  initEmitter,
  isVisible,
  getScrollHeight,
};
