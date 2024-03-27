'use client';

import { usePathname } from 'next/navigation';
import { AppNavLink } from '../header/app-nav-link';

const navLinks = [
  {
    label: 'Profile',
    href: '/app/account/profile',
  },
  {
    label: 'Settings',
    href: '/app/account/settings',
  },
];

export default function AccountNav() {
  const activePathname = usePathname();

  return (
    <nav>
      <ul className="flex justify-center mt-10 gap-x-6 mb-16">
        {navLinks.map(({ href, label }) => (
          <AppNavLink
            className="text-lg font-semibold"
            motionId="account-nav-active-link"
            key={href}
            href={href}
            label={label}
            isActive={activePathname === href}
          />
        ))}
      </ul>
    </nav>
  );
}
