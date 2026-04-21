"use client";

import { Slot } from "radix-ui";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { createContextButton } from "@/lib/factory";
import { resolveRenderProp } from "@/lib/utils";
import { Optional, RenderProp } from "@/types/common";

type UploadMode = "replace" | "add";

type Value = {
  id: string;
  url: string;
};

interface ImageUploaderContextValue {
  onTrigger: (mode: UploadMode) => void;
  previews: Value[];
  remove: (index: number) => void;
  clear: () => void;
}

const ImageUploaderContext =
  createContext<Optional<ImageUploaderContextValue>>(undefined);

function useImageUploader() {
  const context = useContext(ImageUploaderContext);
  if (!context) {
    throw new Error(
      "useImageUploader must be used within an ImageUploaderProvider"
    );
  }
  return context;
}

interface ImageUploaderProps {
  defaultValue?: Value[];
  value?: Value[];
  onChange?: (files: File[]) => void;
}

function ImageUploader({
  defaultValue,
  value,
  onChange,
  children,
}: PropsWithChildren<ImageUploaderProps>) {
  const ref = useRef<HTMLInputElement>(null);
  const uploadModeRef = useRef<UploadMode>("replace");
  const [previews, setPreviews] = useState<Value[]>(defaultValue ?? []);

  const handleTrigger = useCallback((mode: UploadMode) => {
    uploadModeRef.current = mode;
    ref.current?.click();
  }, []);

  const handleFileChange = useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >(
    (event) => {
      const files = event.target.files;
      if (files) {
        const fileArray = Array.from(files);
        const previews = fileArray.map((file) => ({
          id: crypto.randomUUID(),
          url: URL.createObjectURL(file),
        }));
        if (uploadModeRef.current === "replace") {
          setPreviews((prev) => {
            prev.forEach(({ url }) => URL.revokeObjectURL(url));
            return previews;
          });
        } else {
          setPreviews((prev) => [...prev, ...previews]);
        }
        onChange?.(fileArray);
      }
    },
    [onChange]
  );

  const remove = useCallback((index: number) => {
    setPreviews((prev) => {
      if (index < 0 || index >= prev.length) return prev;
      const newPreviews = [...prev];
      const [removed] = newPreviews.splice(index, 1);
      URL.revokeObjectURL(removed.url);
      return newPreviews;
    });
  }, []);

  const clear = useCallback(() => {
    setPreviews((prev) => {
      prev.forEach(({ url }) => URL.revokeObjectURL(url));
      return [];
    });
    if (ref.current) {
      ref.current.value = "";
    }
  }, []);

  useEffect(() => {
    return () => {
      previews.forEach(({ url }) => URL.revokeObjectURL(url));
    };
  }, [previews]);

  return (
    <ImageUploaderContext.Provider
      value={{
        onTrigger: handleTrigger,
        previews: value ?? previews,
        remove,
        clear,
      }}
    >
      <input
        ref={ref}
        type="file"
        accept="image/*"
        hidden
        multiple
        onChange={handleFileChange}
      />
      {children}
    </ImageUploaderContext.Provider>
  );
}

const ImageUploaderTrigger = createContextButton(
  useImageUploader,
  (ctx) => ctx.onTrigger.bind(null, "replace"),
  "ImageUploaderTrigger"
);

const ImageUploaderAdd = createContextButton(
  useImageUploader,
  (ctx) => ctx.onTrigger.bind(null, "add"),
  "ImageUploaderAdd"
);

const ImageUploaderRemove = createContextButton<
  ImageUploaderContextValue,
  { index: number }
>(
  useImageUploader,
  (ctx, props) => ctx.remove.bind(null, props.index),
  "ImageUploaderRemove"
);

const ImageUploaderClear = createContextButton(
  useImageUploader,
  (ctx) => ctx.clear,
  "ImageUploaderClear"
);

function ImageUploaderList({
  children,
  asChild,
  ...props
}: Omit<React.ComponentProps<"ul">, "children"> & {
  asChild?: boolean;
  children?: RenderProp<{ previews: Value[] }>;
}) {
  const { previews } = useImageUploader();

  const Comp = asChild ? Slot.Root : "ul";

  return <Comp {...props}>{resolveRenderProp(children, { previews })}</Comp>;
}

function ImageUploaderItem({
  asChild,
  ...props
}: React.ComponentProps<"li"> & {
  asChild?: boolean;
}) {
  const Comp = asChild ? Slot.Root : "li";

  return <Comp {...props} />;
}

export {
  ImageUploader,
  ImageUploaderAdd,
  ImageUploaderClear,
  ImageUploaderItem,
  ImageUploaderList,
  ImageUploaderRemove,
  ImageUploaderTrigger,
};
