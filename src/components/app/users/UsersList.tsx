'use client';

import { useCurrentUserContext } from '@/hooks/contexts';
import { UserEssentials } from '@/lib/types';
import { useCallback } from 'react';
import UsersListItem from './UsersListItem';

type UsersListProps = {
  users: UserEssentials[];
};

export default function UsersList({ users }: UsersListProps) {
  const currentUser = useCurrentUserContext();

  const isFollowing = useCallback(
    (user: UserEssentials) => {
      return Boolean(
        currentUser.followedUsers?.find(
          (followedUser) => followedUser.id === user.id,
        ),
      );
    },
    [currentUser.followedUsers],
  );

  return (
    <ul>
      {users.map((user) => (
        <UsersListItem
          isFollowing={isFollowing(user)}
          key={user.id}
          user={user}
        />
      ))}
    </ul>
  );
}
