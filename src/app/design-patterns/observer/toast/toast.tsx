import { cva } from "class-variance-authority";
import {
  AlertCircleIcon,
  CheckCircle2Icon,
  InfoIcon,
  XIcon,
} from "lucide-react";
import { useCallback } from "react";

import { cn } from "@/lib/utils";

import { type Toast as ToastData, toast } from "./toast-subject";

const ICONS = {
  success: CheckCircle2Icon,
  error: AlertCircleIcon,
  info: InfoIcon,
} as const satisfies Readonly<Record<ToastData["type"], React.ComponentType>>;

const toastVariants = cva(
  "group/toast relative grid w-full gap-0.5 rounded-lg border px-2.5 py-2 text-left text-sm has-data-[slot=toast-action]:relative has-data-[slot=toast-action]:pr-18 has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-2 *:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg]:text-current *:[svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        success: "bg-green-50 text-green-700",
        error: "bg-red-50 text-red-700",
        info: "bg-blue-50 text-blue-700",
      } satisfies Record<ToastData["type"], string>,
    },
  }
);

export function Toast({ id, type, message }: ToastData) {
  const Icon = ICONS[type];

  const handleClose = useCallback(() => {
    toast.hide(id);
  }, [id]);

  return (
    <div
      data-slot="toast"
      role="toast"
      className={cn(
        toastVariants({ variant: type }),
        "animate-in slide-in-from-right-full duration-100"
      )}
    >
      <Icon />
      <div
        data-slot="toast-title"
        className={
          "font-heading font-medium group-has-[>svg]/toast:col-start-2"
        }
      >
        {type.toUpperCase()}
      </div>
      <div
        data-slot="toast-description"
        className={"text-sm text-balance md:text-pretty"}
      >
        {message}
      </div>
      <div data-slot="alert-action" className={"absolute top-2 right-2"}>
        <XIcon onClick={handleClose} className="cursor-pointer size-4" />
      </div>
    </div>
  );
}
