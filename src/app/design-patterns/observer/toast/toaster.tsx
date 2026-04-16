"use client";

import { PropsWithChildren } from "react";

import { Toast } from "./toast";
import { useToastStore } from "./use-toast-store";

export function Toaster(props: PropsWithChildren) {
  const toasts = useToastStore();

  return (
    <>
      {props.children}
      <div className="flex flex-col fixed top-2 right-2 gap-2 w-xs max-w-xs">
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} />
        ))}
      </div>
    </>
  );
}
