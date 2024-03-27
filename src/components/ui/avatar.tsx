'use client';

import { cn } from '@/lib/utils/cn';
import { PersonIcon } from '@radix-ui/react-icons';
import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

type AvatarProps = ImageProps & {
  src: string | null;
  alt?: string;
  className?: string;
  isSmall?: boolean;
  size?: 'sm' | 'md' | 'lg';
};

export default function Avatar({
  src,
  alt,
  isSmall,
  className,
  size = 'md',
  ...props
}: AvatarProps) {
  const [showPlaceholder, setShowPlaceholder] = useState(false);

  const sizeData = {
    className: '',
    value: null,
  } as { className: string; value: number | null };

  switch (size) {
    case 'sm':
      sizeData.className = 'h-8 w-8';
      sizeData.value = 32;
      break;
    case 'md':
      sizeData.className = 'h-12 w-12';
      sizeData.value = 48;
      break;
    case 'lg':
      sizeData.className = 'h-[96px] w-[96px]';
      sizeData.value = 96;
      break;
  }

  if (!src || showPlaceholder) {
    return (
      <div
        className={cn(
          'flex shrink-0 items-center justify-center text-slate-100 bg-slate-600 rounded-full',
          sizeData.className,
          className,
        )}
      >
        <PersonIcon width={sizeData.value - 12} height={sizeData.value - 12} />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      height={sizeData.value}
      width={sizeData.value}
      {...props}
      className={sizeData.className}
      onError={() => setShowPlaceholder(true)}
    />
  );
}
