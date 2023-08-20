import { nextTick } from "vue";
import type { Ref } from "vue";
import type { Params, Target } from "./types";

function isVisible(el: Element, view: Element | null): boolean {
  const elRect = el.getBoundingClientRect();
  if (!view) return elRect.top >= 0 && elRect.bottom <= window.innerHeight;
  const viewRect = view.getBoundingClientRect();
  return elRect.top >= viewRect.top && elRect.bottom <= viewRect.bottom;
}

async function getParentEl(target: Ref<Target>): Promise<Element | null> {
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
  observer.observe(params.infiniteLoading.value!);
  return observer;
}

async function updateScrollPosition(params: Params, prevHeight: number) {
  const parentEl = params.parentEl || document.documentElement;
  await nextTick();
  parentEl.scrollTop = parentEl.scrollHeight - prevHeight;
}

export { startObserver, isVisible, getParentEl, updateScrollPosition };
