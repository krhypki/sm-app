import Avatar from '@/components/ui/avatar';

type ImageUploaderPreviewProps = {
  imageSrc: string | null;
  imageAlt: string;
};

export default function ImageUploaderPreview({
  imageSrc,
  imageAlt,
}: ImageUploaderPreviewProps) {
  const src = imageSrc;

  return (
    <div className="flex items-center justify-center gap-x-6">
      <Avatar size="lg" src={imageSrc || ''} alt={imageAlt} />
    </div>
  );
}
