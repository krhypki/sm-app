'use client';

import { toggleFollow } from '@/actions/user';
import Button from '@/components/ui/button';
import { cn } from '@/lib/utils/cn';
import { User } from '@prisma/client';
import { HeartFilledIcon, HeartIcon } from '@radix-ui/react-icons';
import { MouseEvent } from 'react';

type FollowTogglerProps = {
  isFollowing: Boolean;
  user: User['id'];
  className?: string;
};

export default function FollowToggler({
  user,
  isFollowing,
  className,
}: FollowTogglerProps) {
  const handleToggleFollow = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    event.currentTarget.blur();

    toggleFollow(user, isFollowing ? 'disconnect' : 'connect');
  };

  return (
    <Button
      className={cn('ml-auto', className)}
      onClick={handleToggleFollow}
      variant={`${isFollowing ? 'secondary' : 'default'}`}
    >
      {isFollowing && (
        <>
          Unfollow
          <HeartIcon className="ml-2" />
        </>
      )}

      {!isFollowing && (
        <>
          Follow
          <HeartFilledIcon className="ml-2" />
        </>
      )}
    </Button>
  );
}
