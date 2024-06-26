import { cn } from '@/lib/utils/cn';

type ContentBlockProps = {
  children: React.ReactNode;
  className?: string;
};

export default function ContentBlock({
  children,
  className,
}: ContentBlockProps) {
  return (
    <div
      className={cn(
        'bg-slate-100 rounded-md shadow-sm h-full w-full overflow-hidden px-4 py-8 lg:p-8',
        className,
      )}
    >
      {children}
    </div>
  );
}
