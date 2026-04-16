"use client";

import { useCallback } from "react";

import { Button } from "@/components/ui/button";

import { Toast, toast } from "./toast-subject";
import { Toaster } from "./toaster";

const TYPES = ["success", "error", "info"] as const satisfies ReadonlyArray<
  Toast["type"]
>;

export default function ToastPage() {
  const handleShowToast = useCallback((type: Toast["type"]) => {
    toast.show("This is a toast message!", type);
  }, []);

  return (
    <>
      <div className="flex flex-col gap-2 max-w-md">
        {TYPES.map((type) => (
          <Button key={type} onClick={handleShowToast.bind(null, type)}>
            Show {type.charAt(0).toUpperCase() + type.slice(1)}Toast
          </Button>
        ))}
      </div>
      <Toaster />
    </>
  );
}
