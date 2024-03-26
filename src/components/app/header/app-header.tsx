'use client';

import Container from '@/components/ui/container';
import { MediaQueryContextProvider } from '@/contexts/media-query-context-provider';
import Logo from '../../general/logo';
import AppNav from './app-nav';

export default function AppHeader() {
  return (
    <MediaQueryContextProvider>
      <header className=" relative text-slate-100 w-full bg-slate-800 px-6 py-3">
        <Container className="flex items-center justify-between">
          <Logo variant="light" />
          <AppNav />
        </Container>
      </header>
    </MediaQueryContextProvider>
  );
}
