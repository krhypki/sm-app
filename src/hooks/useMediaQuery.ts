import { useEffect, useState } from 'react';
import { theme } from 'tailwindcss/defaultConfig';

export function useMediaQuery() {
  const [activeBreakpoint, setActiveBreakpoint] = useState<Record<string, any>>(
    [],
  );
  const isMobile = activeBreakpoint[0] === 'sm' || activeBreakpoint[0] === 'md';

  useEffect(() => {
    const getCurrentEndpoint = () => {
      const breakpoints = Object.entries(theme?.screens || {});
      const maxBreakpoint = breakpoints[breakpoints.length - 1];
      const maxBreakpointWidth = parseInt(maxBreakpoint[1]);
      const width = window.innerWidth;

      if (maxBreakpointWidth <= width) {
        setActiveBreakpoint(maxBreakpoint);
        return;
      }

      const breakpointsWiderThanWindow = breakpoints.filter(([key, value]) => {
        return parseInt(value) >= width;
      });

      setActiveBreakpoint(breakpointsWiderThanWindow[0]);
    };

    getCurrentEndpoint();
    window.addEventListener('resize', getCurrentEndpoint);

    return () => window.removeEventListener('resize', getCurrentEndpoint);
  }, []);

  return {
    activeBreakpoint,
    isMobile,
  };
}
