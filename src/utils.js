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

const initEmitter = (emit, stateHandler, params) => {
  return () => {
    const parentEl = params.parentEl || document.documentElement
    params.prevHeight = parentEl.scrollHeight;
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

const startObserver = params => {
  params.parentEl = document.querySelector(params.target) || null;
  let rootMargin = `0px 0px ${params.distance}px 0px`;
  if (params.top) rootMargin = `${params.distance}px 0px 0px 0px`;
  const observer = new IntersectionObserver(
    entries => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        if (params.firstload) params.emit();
        params.firstload = true;
      }
    },
    { root: params.parentEl, rootMargin }
  );
  observer.observe(params.infiniteLoading.value);
  return observer;
};

export { startObserver, stateHandler, initEmitter, isVisible };
