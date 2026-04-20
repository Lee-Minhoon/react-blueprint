import { throttle } from "es-toolkit";
import { useMemo, useSyncExternalStore } from "react";

import { windowEvents } from "./window-event-manager";

const getSnapshot = () => window.innerWidth;
const getServerSnapshot = () => 0;

export function useWindowWidth(throttleMs = 64) {
  const subscribe = useMemo(() => {
    return (onStoreChange: () => void) =>
      windowEvents.get("resize").subscribe(throttle(onStoreChange, throttleMs));
  }, [throttleMs]);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
