import Avatar from '@/components/ui/Avatar';
import { ImageUploadVariant } from '@/lib/types';
import Image from 'next/image';

type ImageUploaderPreviewProps = {
  imageSrc: string | null;
  imageAlt: string;
  variant: ImageUploadVariant;
};

export default function ImageUploaderPreview({
  imageSrc,
  imageAlt,
  variant,
}: ImageUploaderPreviewProps) {
  const src = imageSrc;

  return (
    <div className="flex items-center justify-center gap-x-6">
      {variant === 'avatar' && (
        <Avatar size="lg" src={imageSrc || ''} alt={imageAlt} />
      )}

      {variant === 'image' && imageSrc && (
        <Image
          src={imageSrc}
          width="300"
          height="200"
          alt={imageAlt}
          className="w-[300px] h-[200px]"
        />
      )}
    </div>
  );
}
