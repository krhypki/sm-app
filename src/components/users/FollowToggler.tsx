'use client';

import { toggleFollow } from '@/actions/user';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils/cn';
import { User } from '@prisma/client';
import { HeartFilledIcon, HeartIcon } from '@radix-ui/react-icons';
import { MouseEvent, useOptimistic } from 'react';
import { toast } from 'react-toastify';

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
  const [optimisticIsFollowing, setOptimisticIsFollowing] =
    useOptimistic(isFollowing);

  const handleToggleFollow = async (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    event.currentTarget.blur();

    setOptimisticIsFollowing((prev) => !prev);
    const response = await toggleFollow(
      user,
      isFollowing ? 'disconnect' : 'connect',
    );
    if (response?.error) {
      toast.error(response.error);
    }
  };

  return (
    <Button
      className={cn('md:ml-auto', className)}
      onClick={handleToggleFollow}
      variant={`${optimisticIsFollowing ? 'secondary' : 'default'}`}
    >
      {optimisticIsFollowing && (
        <>
          Unfollow
          <HeartIcon className="ml-2" />
        </>
      )}

      {!optimisticIsFollowing && (
        <>
          Follow
          <HeartFilledIcon className="ml-2" />
        </>
      )}
    </Button>
  );
}
