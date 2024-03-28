'use client';

import { toggleFollow } from '@/actions/user';
import Avatar from '@/components/ui/avatar';
import Button from '@/components/ui/button';
import { UserEssentials } from '@/lib/types';
import { getUserFullname } from '@/lib/utils/get-user-fullname';
import Link from 'next/link';
import { MouseEvent } from 'react';

type UserListitemProps = {
  user: UserEssentials;
  isFollowing: boolean;
};

export default function UsersListItem({
  user,
  isFollowing,
}: UserListitemProps) {
  const fullName = getUserFullname(user);

  const handleToggleFollow = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    event.currentTarget.blur();

    toggleFollow(user.id, isFollowing ? 'disconnect' : 'connect');
  };

  return (
    <li className="border-b last-of-type:border-none border-slate-300 hover:bg-slate-400 hover:text-slate-100">
      <Link
        href={`/app/user/${user.id}`}
        className="flex items-center gap-x-6 p-3"
      >
        <Avatar src={user.avatar || ''} alt={fullName} />
        <p>{fullName}</p>

        <Button
          className="ml-auto"
          onClick={handleToggleFollow}
          variant={`${isFollowing ? 'secondary' : 'default'}`}
        >
          {isFollowing ? 'Unfollow' : 'Follow'}
        </Button>
      </Link>
    </li>
  );
}
