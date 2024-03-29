'use client';

import { findPeople } from '@/actions/users';
import { useDebounce } from '@/hooks/useDebounce';
import { UserEssentials } from '@/lib/types';
import { useRouter, useSearchParams } from 'next/navigation';
import { createContext, useEffect, useState } from 'react';

type FindPeopleContextProviderProps = {
  children: React.ReactNode;
};

type FindPeopleContextType = {
  users: UserEssentials[];
  totalPages: number;
  currentPage: number;
  isLoading: boolean;
  handleQueryUpdate: (query: string) => void;
};

type UserData = {
  totalPages: number;
  users: UserEssentials[];
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
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query);

  const page = params.get('page') ?? 1;

  useEffect(() => {
    const getUsersData = async () => {
      setIsLoading(true);
      const newUsersData = await findPeople(+page, debouncedQuery);
      setUsersData(newUsersData);

      setIsLoading(false);
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
        isLoading,
        handleQueryUpdate,
      }}
    >
      {children}
    </FindPeopleContext.Provider>
  );
}
