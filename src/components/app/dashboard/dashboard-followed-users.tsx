'use client';

import ContentBlock from '@/components/ui/content-block';
import Heading from '@/components/ui/heading';

import Input from '@/components/ui/input';
import { UserEssentials } from '@/lib/types';
import { formatInputValue } from '@/lib/utils/format-input-value';
import { getUserFullname } from '@/lib/utils/get-user-fullname';
import { useMemo, useState } from 'react';
import UsersList from '../users/UsersList';

type DashboardFollowedUsersProps = {
  initialUsers: UserEssentials[];
};

export default function DashboardFollowedUsers({
  initialUsers,
}: DashboardFollowedUsersProps) {
  const [searchValue, setSearchValue] = useState('');

  const users = useMemo(() => {
    const searchText = formatInputValue(searchValue);
    const filteredUsers = initialUsers.filter((user) => {
      return getUserFullname(user).toLowerCase().includes(searchText);
    });

    return filteredUsers.splice(0, 10);
  }, [searchValue, initialUsers]);

  return (
    <ContentBlock className="h-auto">
      <Heading className="text-center mb-10" tag="h2">
        Followed users
      </Heading>

      <form className="mb-4">
        <Input
          value={searchValue}
          placeholder="Search users"
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </form>
      <UsersList users={users} />
    </ContentBlock>
  );
}
