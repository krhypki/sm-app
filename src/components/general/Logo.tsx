import { APP_NAME } from '@/lib/constants';
import { cn } from '@/lib/utils/cn';
import { BlendingModeIcon } from '@radix-ui/react-icons';

type LogoProps = {
  className?: string;
  variant?: 'light' | 'dark';
};

export default function Logo({ className, variant }: LogoProps) {
  return (
    <div className={cn('flex items-center gap-x-3 top-0 left-0', className)}>
      <div className="inline-block bg-slate-200 text-slate-900 rounded-full p-2">
        <BlendingModeIcon height="32" width="32" />
      </div>
      <span
        className={`font-semibold mb-0 ${
          variant === 'light' ? 'text-slate-100' : ''
        }`}
      >
        {APP_NAME}
      </span>
    </div>
  );
}
