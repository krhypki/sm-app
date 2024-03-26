import { motion } from 'framer-motion';
import Link from 'next/link';

type AppNavLinkProps = {
  href: string;
  label: string;
  isActive?: boolean;
};

export function AppNavLink({ href, label, isActive }: AppNavLinkProps) {
  return (
    <li className="hover:scale-110 transition-all relative pb-2" key={href}>
      <Link href={href}>{label}</Link>

      {isActive && (
        <motion.div
          layoutId="nav-active-link"
          className="bg-accent h-1 w-full absolute bottom-0"
        ></motion.div>
      )}
    </li>
  );
}
