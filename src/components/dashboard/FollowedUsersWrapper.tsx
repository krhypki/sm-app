'use server';

import { getCurrentUser } from '@/lib/db/user';
import { FollowedUsers } from './FollowedUsers';

export default async function FollowedUsersWrapper() {
  const user = await getCurrentUser();

  return <FollowedUsers currentUser={user} />;
}
