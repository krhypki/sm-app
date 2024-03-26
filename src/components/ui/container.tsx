import { cn } from '@/lib/utils/cn';

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn('w-full max-w-screen-xl mx-auto px-4', className)}>
      {children}
    </div>
  );
}
