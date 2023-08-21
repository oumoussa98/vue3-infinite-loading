import type { Ref } from "vue";

export type Target = HTMLElement | string | null | undefined;

export type State = "" | "loading" | "loaded" | "complete" | "error";

export interface StateHandler {
  loading: () => void;
  loaded: () => void;
  complete: () => void;
  error: () => void;
}

export interface Params {
  parentEl: Element | null;
  distance: number;
  top: boolean;
  firstload: boolean;
  infiniteLoading: Ref<HTMLDivElement | null>;
  emit: () => void;
}

export interface Slots {
  complete?: string;
  noResults?: string;
  error?: string;
}

export interface Props {
  top?: boolean;
  target?: Target;
  distance?: number;
  identifier?: any;
  firstload?: boolean;
  slots?: Slots;
}
