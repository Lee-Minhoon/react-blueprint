"use client";

import { useCallback } from "react";

import { useMousePosition } from "./use-mouse-position";
import { useWindowEvent } from "./use-window-event";
import { useWindowWidth } from "./use-window-width";

export default function WindowEventPage() {
  const width = useWindowWidth();
  const [x, y] = useMousePosition();

  useWindowEvent(
    "keydown",
    useCallback((e) => {
      if (e.key === "Escape") console.log("Escape!!!");
    }, [])
  );

  return (
    <div className="flex flex-col">
      <span>{`window width: ${width}`}</span>
      <span>{`mouse position: ${x}, ${y}`}</span>
    </div>
  );
}
