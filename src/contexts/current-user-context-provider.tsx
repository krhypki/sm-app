'use client';

import { User } from '@prisma/client';
import { createContext } from 'react';

type CurrentUserContextProviderProps = {
  children: React.ReactNode;
  user: User;
};

export const CurrentUserContext = createContext<User | null>(null);

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
