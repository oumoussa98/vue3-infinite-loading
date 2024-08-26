import { nextTick } from "vue";
import type { Ref } from "vue";
import type { Params, Target } from "./types";

function isVisible(el: Element, view: Element | null = null): boolean {
  if (!el) return false;

  const elRect = el.getBoundingClientRect();
  const viewRect = view
    ? view.getBoundingClientRect()
    : { top: 0, left: 0, bottom: window.innerHeight, right: window.innerWidth };

  return (
    elRect.bottom >= viewRect.top &&
    elRect.top <= viewRect.bottom &&
    elRect.right >= viewRect.left &&
    elRect.left <= viewRect.right
  );
}

async function getParentEl(target?: Ref<Target | undefined>): Promise<Element | null> {
  if (!target) return null;

  await nextTick();
  if (target.value instanceof HTMLElement) return target.value;
  return target.value ? document.querySelector(target.value) : null;
}

function startObserver(params: Params) {
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
  if (params.infiniteLoading.value) observer.observe(params.infiniteLoading.value);
  return observer;
}

async function updateScrollPosition(params: Params, prevHeight: number) {
  await nextTick();
  if (!params.top) return;
  const parentEl = params.parentEl || document.documentElement;
  parentEl.scrollTop = parentEl.scrollHeight - prevHeight;
}

export { startObserver, isVisible, getParentEl, updateScrollPosition };
