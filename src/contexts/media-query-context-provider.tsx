import { useMediaQuery } from '@/hooks/useMediaQuery';
import { createContext } from 'react';

type MediaQueryContextProviderProps = {
  children: React.ReactNode;
};

type MediaQueryContextType = {
  isMobile: boolean;
  activeBreakpoint: Record<string, string>;
};

export const MediaQueryContext = createContext<MediaQueryContextType | null>(
  null,
);

export function MediaQueryContextProvider({
  children,
}: MediaQueryContextProviderProps) {
  const { isMobile, activeBreakpoint } = useMediaQuery();

  return (
    <MediaQueryContext.Provider value={{ isMobile, activeBreakpoint }}>
      {children}
    </MediaQueryContext.Provider>
  );
}
