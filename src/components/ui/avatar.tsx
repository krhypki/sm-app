'use client';

import { cn } from '@/lib/utils/cn';
import { PersonIcon } from '@radix-ui/react-icons';
import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

type AvatarProps = ImageProps & {
  src?: string;
  alt?: string;
  className?: string;
  isSmall?: boolean;
};

export default function Avatar({
  src,
  alt,
  isSmall,
  className,
  ...props
}: AvatarProps) {
  const [showPlaceholder, setShowPlaceholder] = useState(false);

  const size = isSmall ? 32 : 48;

  if (!src || showPlaceholder) {
    return (
      <div
        className={cn(
          'flex shrink-0 items-center justify-center text-slate-100 bg-slate-600 rounded-full w-12 h-12',
          { 'h-8 w-8': isSmall },
          className,
        )}
      >
        <PersonIcon width={size - 12} height={size - 12} />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      {...props}
      height={size}
      width={size}
      onError={() => setShowPlaceholder(true)}
    />
  );
}
