'use client';

import { findPeople } from '@/actions/users';
import { useDebounce } from '@/hooks/useDebounce';
import { User } from '@prisma/client';
import { useRouter, useSearchParams } from 'next/navigation';
import { createContext, useEffect, useState } from 'react';

type FindPeopleContextProviderProps = {
  children: React.ReactNode;
};

type FindPeopleContextType = {
  users: User[];
  totalPages: number;
  currentPage: number;
  handleQueryUpdate: (query: string) => void;
};

type UserData = {
  totalPages: number;
  users: Partial<User>[];
};

export const FindPeopleContext = createContext<FindPeopleContextType | null>(
  null,
);

export function FindPeopleContextProvider({
  children,
}: FindPeopleContextProviderProps) {
  const params = useSearchParams();
  const router = useRouter();
  const [usersData, setUsersData] = useState<UserData>({
    users: [],
    totalPages: 0,
  });
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query);

  const page = params.get('page') ?? 1;

  useEffect(() => {
    const getUsersData = async () => {
      const newUsersData = await findPeople(+page, debouncedQuery);
      setUsersData(newUsersData);
    };

    getUsersData();
  }, [page, debouncedQuery]);

  const handleQueryUpdate = async (query: string) => {
    setQuery(query);
    router.replace('/app/find-people');
  };

  return (
    <FindPeopleContext.Provider
      value={{
        users: usersData.users,
        currentPage: +page,
        totalPages: usersData.totalPages,
        handleQueryUpdate,
      }}
    >
      {children}
    </FindPeopleContext.Provider>
  );
}
