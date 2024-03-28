import { CurrentUserContext } from '@/contexts/current-user-context-provider';
import { FindPeopleContext } from '@/contexts/find-ppl-context-provider';
import { MediaQueryContext } from '@/contexts/media-query-context-provider';
import { Context, useContext } from 'react';

const useContextWithErrorHandle = <T>(context: Context<T>, name: string) => {
  const contextData = useContext(context);

  if (!contextData) {
    throw new Error(`${name} must be used within ContextProvider`);
  }

  return contextData;
};

export function useMediaQueryContext() {
  return useContextWithErrorHandle(MediaQueryContext, 'useMediaQueryContext');
}

export function useCurrentUserContext() {
  return useContextWithErrorHandle(CurrentUserContext, 'useCurrentUserContext');
}

export function useFindPeopleContext() {
  return useContextWithErrorHandle(FindPeopleContext, 'useFindPeopleContext');
}
