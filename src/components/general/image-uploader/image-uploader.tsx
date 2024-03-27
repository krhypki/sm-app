'use client';

import { imageSchema } from '@/lib/utils/validation-schemas';
import React, { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import Button from '../../ui/button';
import ImageUploaderPreview from './image-uploader-preview';

interface ImageUploaderProps {
  imageAlt: string;
  initialImage: string | null;
}

export const ImageUploader = ({
  imageAlt,
  initialImage,
}: ImageUploaderProps) => {
  const [draggingOver, setDraggingOver] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(initialImage);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const dropRef = useRef(null);

  const preventDefaults = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    preventDefaults(e);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      e.dataTransfer.clearData();

      createPreviewImg(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files && event.currentTarget.files[0]) {
      const validatedImage = imageSchema.safeParse(
        event.currentTarget.files[0],
      );

      if (!validatedImage.success) {
        toast.error(validatedImage.error.errors[0].message);
        return;
      }

      createPreviewImg(event.currentTarget.files[0]);
    }
  };

  const createPreviewImg = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const target = e.target;
      setImageSrc(target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  // 4
  return (
    <div className="flex flex-col gap-y-10">
      <ImageUploaderPreview imageSrc={imageSrc} imageAlt={imageAlt} />

      <div
        className="border border-dotted border-slate-900  bg-slate-200 relative cursor-pointer max-w-full w-[400px] h-[200px] flex flex-col items-center justify-center rounded-md hover:opacity-70 transition-all"
        ref={dropRef}
        onDragEnter={() => setDraggingOver(true)}
        onDragLeave={() => setDraggingOver(false)}
        onDrag={preventDefaults}
        onDragStart={preventDefaults}
        onDragEnd={preventDefaults}
        onDragOver={preventDefaults}
        onDrop={handleDrop}
      >
        <Button className="mb-4">Browse image</Button>
        <span>or drop it here</span>
        <input
          type="file"
          name="file"
          ref={fileInputRef}
          onChange={handleChange}
          className="absolute w-full h-full z-10 opacity-0 cursor-pointer"
        />
      </div>
    </div>
  );
};
