import { User } from 'next-auth';
import { UserWithRelations } from '../types';

export function isFollowingUser(
  currentUser: UserWithRelations,
  userId: User['id'],
) {
  return Boolean(
    currentUser.followedUsers.find(
      (followedUser) => followedUser.id === userId,
    ),
  );
}
