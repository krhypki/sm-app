import { MediaQueryContext } from '@/contexts/media-query-context-provider';
import { Context, useContext } from 'react';

const useContextWithErrorHandle = <T>(context: Context<T>, name: string) => {
  const contextData = useContext(context);

  if (!contextData) {
    throw new Error(`${name} must be used within OffersContextProvider`);
  }

  return contextData;
};

export function useMediaQueryContext() {
  return useContextWithErrorHandle(MediaQueryContext, 'useMediaQueryContext');
}
