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
  if (view === window) return elRect.top >= 0 && elRect.bottom <= view.innerHeight;
  const viewRect = view.getBoundingClientRect();
  return elRect.top >= viewRect.top && elRect.bottom <= viewRect.bottom;
};

const getParent = target => {
  let parentEl = window;
  if (target) parentEl = document.querySelector(target);
  return parentEl || window;
};

const getScrollHeight = el => {
  return el.scrollHeight || document.documentElement.scrollHeight;
};

const intersect = entries => {
  const entry = entries[0];
  if (entry.isIntersecting) emit();
};

let observer;
const startObserver = params => {
  params.parentEl = getParent(params.target);
  emit = params.emit;
  observer = new IntersectionObserver(intersect, null);
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
