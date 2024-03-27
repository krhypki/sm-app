import MotionBorder from '@/components/general/motion-border';
import Link from 'next/link';
import { cn } from '@/lib/utils/cn';

type AppNavLinkProps = {
  href: string;
  label: string;
  isActive?: boolean;
  motionId?: string;
  className?: string;
};

export function AppNavLink({
  href,
  label,
  isActive,
  className,
  motionId = 'nav-active-link',
}: AppNavLinkProps) {
  return (
    <li
      className={cn('hover:scale-110 transition-all relative pb-2', className)}
      key={href}
    >
      <Link href={href}>{label}</Link>

      {isActive && <MotionBorder layoutId={motionId} />}
    </li>
  );
}
