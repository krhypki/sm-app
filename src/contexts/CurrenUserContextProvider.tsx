'use client';

import { UserWithRelations } from '@/lib/types';
import { createContext } from 'react';

type CurrentUserContextProviderProps = {
  children: React.ReactNode;
  user: UserWithRelations;
};

export const CurrentUserContext = createContext<UserWithRelations | null>(null);

export default function CurrentUserContextProvider({
  children,
  user,
}: CurrentUserContextProviderProps) {
  return (
    <CurrentUserContext.Provider value={user}>
      {children}
    </CurrentUserContext.Provider>
  );
}
