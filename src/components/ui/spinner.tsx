import { cn } from '@/lib/utils/cn';

type SpinnerProps = {
  className?: string;
  variant?: 'light' | 'dark';
};

export default function Spinner({
  className,
  variant = 'light',
}: SpinnerProps) {
  return (
    <div
      className={cn(
        'animate-spin h-20 w-20 border-2 border-b-0 border-l-0 rounded-full',
        variant === 'light' ? 'border-gray-200' : 'border-gray-800',
        className,
      )}
    ></div>
  );
}
