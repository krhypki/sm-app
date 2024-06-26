import { CurrentUserContext } from '@/contexts/CurrenUserContextProvider';
import { FindPeopleContext } from '@/contexts/FIndPplContextProvider';
import { MediaQueryContext } from '@/contexts/MediaQueryContextProvider';
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
