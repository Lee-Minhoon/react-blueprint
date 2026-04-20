import { throttle } from "es-toolkit";
import { useCallback, useMemo, useRef, useSyncExternalStore } from "react";

import { windowEvents } from "./window-event-manager";

const SERVER_INITIAL_POS: [number, number] = [0, 0] as const;
const getServerSnapshot = () => SERVER_INITIAL_POS;

export function useMousePosition(throttleMs = 64) {
  const pos = useRef([0, 0]);

  const subscribe = useMemo(() => {
    return (onStoreChange: () => void) => {
      const throttled = throttle((e: MouseEvent) => {
        pos.current = [e.clientX, e.clientY];
        onStoreChange();
      }, throttleMs);

      return windowEvents.get("mousemove").subscribe(throttled);
    };
  }, [throttleMs]);

  const getSnapshot = useCallback(() => pos.current, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
