import { useEffect } from "react";

import { windowEvents } from "./window-event-manager";

export function useWindowEvent<T extends keyof WindowEventMap>(
  type: T,
  callback: (e: WindowEventMap[T]) => void
) {
  useEffect(() => {
    return windowEvents.get(type).subscribe(callback);
  }, [type, callback]);
}
