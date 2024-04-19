'use client';

import Container from '@/components/ui/Container';
import { MediaQueryContextProvider } from '@/contexts/MediaQueryContextProvider';
import Link from 'next/link';
import Logo from '../general/Logo';
import AppNav from './AppNav';

export default function AppHeader() {
  return (
    <MediaQueryContextProvider>
      <header className="sticky top-0 left-0 text-slate-100 w-full bg-slate-800 px-6 py-3">
        <Container className="flex items-center justify-between">
          <Link href="/app/dashboard">
            <Logo variant="light" />
          </Link>
          <AppNav />
        </Container>
      </header>
    </MediaQueryContextProvider>
  );
}
