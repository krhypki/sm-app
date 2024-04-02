'use server';

import { getCurrentUser } from '@/lib/db/user';
import { FollowedUsers } from './followed-users';

export default async function FollowedUsersWrapper() {
  const user = await getCurrentUser();

  return <FollowedUsers currentUser={user} />;
}
