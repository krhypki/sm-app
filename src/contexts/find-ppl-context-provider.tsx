'use client';

import { findPeople } from '@/actions/users';
import { useDebounce } from '@/hooks/useDebounce';
import { UserEssentials, UserWithRelations } from '@/lib/types';
import { useRouter, useSearchParams } from 'next/navigation';
import { createContext, useEffect, useState } from 'react';

type FindPeopleContextProviderProps = {
  children: React.ReactNode;
  currentUser: UserWithRelations;
};

type FindPeopleContextType = {
  users: UserEssentials[];
  totalPages: number;
  currentPage: number;
  isLoading: boolean;
  currentUser: UserWithRelations;
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
  currentUser,
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
    setQuery(query.toLocaleLowerCase());
    router.replace('/app/find-people');
  };

  return (
    <FindPeopleContext.Provider
      value={{
        users: usersData.users,
        currentPage: +page,
        totalPages: usersData.totalPages,
        currentUser,
        isLoading,
        handleQueryUpdate,
      }}
    >
      {children}
    </FindPeopleContext.Provider>
  );
}
