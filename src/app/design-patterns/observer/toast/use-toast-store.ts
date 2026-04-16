"use client";

import { useSyncExternalStore } from "react";

import { Toast, toast } from "./toast-subject";

const EMPTY_TOASTS: Toast[] = [] as const;

export function useToastStore() {
  return useSyncExternalStore(
    toast.subscribe,
    toast.getToasts,
    () => EMPTY_TOASTS
  );
}
