import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { RenderProp } from "@/types/common";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function resolveRenderProp<T>(children: RenderProp<T>, props: T) {
  return typeof children === "function" ? children(props) : children;
}
