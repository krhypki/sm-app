'use client';

import { UserWithRelations } from '@/lib/types';
import { formatInputValue } from '@/lib/utils/formatInputValue';
import { getUserFullname } from '@/lib/utils/getUserFullname';
import { useMemo, useState } from 'react';
import Input from '../ui/Input';
import UsersList from '../users/UsersList';

type FollowedUsersProps = {
  currentUser: UserWithRelations;
};

export function FollowedUsers({ currentUser }: FollowedUsersProps) {
  const [searchValue, setSearchValue] = useState('');

  const users = useMemo(() => {
    const searchText = formatInputValue(searchValue);
    const filteredUsers = currentUser.followedUsers.filter((user) => {
      return getUserFullname(user).toLowerCase().includes(searchText);
    });

    return filteredUsers.splice(0, 10);
  }, [searchValue, currentUser.followedUsers]);

  return (
    <>
      {!!users.length && (
        <form className="mb-8">
          <Input
            value={searchValue}
            placeholder="Search users"
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </form>
      )}

      <UsersList users={users} currentUser={currentUser} />
    </>
  );
}
