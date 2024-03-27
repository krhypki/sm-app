import { useMediaQueryContext } from '@/hooks/contexts';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Collapse from '../../ui/collapse';
import { AppNavHamburger } from './app-nav-hamburger';
import { AppNavLink } from './app-nav-link';

const links = [
  {
    href: '/app/find-people',
    label: 'Find People',
  },
  {
    href: '/app/dashboard',
    label: 'Dashboard',
  },
  {
    href: '/app/account/profile',
    basePath: '/app/account',
    label: 'Account',
  },
];

export default function AppNav() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const activePathname = usePathname();
  const { isMobile } = useMediaQueryContext();

  useEffect(() => {
    setShowMobileMenu(false);
  }, [activePathname]);

  const linkElements = links.map((link) => (
    <AppNavLink
      key={link.href}
      {...link}
      isActive={activePathname.includes(link.basePath || link.href)}
    />
  ));

  return (
    <nav>
      {isMobile && (
        <AppNavHamburger onClick={() => setShowMobileMenu(!showMobileMenu)} />
      )}

      {!isMobile && <ul className="flex gap-x-5">{linkElements}</ul>}

      {isMobile && (
        <div className="absolute  w-full top-full left-0 z-30  bg-slate-800">
          {isMobile && (
            <Collapse isOpen={showMobileMenu}>
              <ul className="flex flex-col items-center justify-center border-t border-slate-200 py-5 gap-y-5">
                {linkElements}
              </ul>
            </Collapse>
          )}
        </div>
      )}
    </nav>
  );
}
