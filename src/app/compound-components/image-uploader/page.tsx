"use client";

import { XIcon } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";

import {
  ImageUploader,
  ImageUploaderAdd,
  ImageUploaderClear,
  ImageUploaderItem,
  ImageUploaderList,
  ImageUploaderRemove,
  ImageUploaderTrigger,
} from "./image-uploader";

function ImageUploaderPage() {
  return (
    <ImageUploader>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <ImageUploaderTrigger asChild>
            <Button>Upload</Button>
          </ImageUploaderTrigger>
          <ImageUploaderAdd asChild>
            <Button>Add</Button>
          </ImageUploaderAdd>
          <ImageUploaderClear asChild>
            <Button>Clear</Button>
          </ImageUploaderClear>
        </div>
        <ImageUploaderList className="grid grid-cols-5">
          {({ previews }) =>
            previews.map(({ id, url }, index) => (
              <ImageUploaderItem key={id} className="relative aspect-square">
                <Image
                  src={url}
                  alt={`Preview ${index + 1}`}
                  fill
                  className="object-cover"
                />
                <ImageUploaderRemove
                  index={index}
                  className="absolute top-0 right-0 bg-background rounded-full p-1 m-1 opacity-70 hover:opacity-100 transition-opacity"
                >
                  <XIcon />
                </ImageUploaderRemove>
              </ImageUploaderItem>
            ))
          }
        </ImageUploaderList>
      </div>
    </ImageUploader>
  );
}

export default ImageUploaderPage;
