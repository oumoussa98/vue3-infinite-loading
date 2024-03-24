import { nextTick } from "vue";
import type { Ref } from "vue";
import type { Target } from "./types";

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

export { isVisible, getParentEl };
