import MotionBorder from '@/components/general/motion-border';
import { cn } from '@/lib/utils/cn';
import Link from 'next/link';

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
      <Link className="p-2" href={href}>
        {label}
      </Link>

      {isActive && <MotionBorder layoutId={motionId} />}
    </li>
  );
}
