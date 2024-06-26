'use client';

import Spinner from '@/components/ui/Spinner';
import { useFindPeopleContext } from '@/hooks/contexts';
import UsersList from '../users/UsersList';
import FindPeoplePagination from './FindPeoplePagination';

export default function FindPeopleList() {
  const { users, currentUser, isLoading } = useFindPeopleContext();

  if (isLoading) {
    return (
      <div className="flex justify-center pt-10">
        <Spinner variant="dark" />;
      </div>
    );
  }

  return (
    <div>
      {!!users.length && <UsersList users={users} currentUser={currentUser} />}

      {!users.length && (
        <p className="text-center text-2xl font-semibold">No users found</p>
      )}

      <FindPeoplePagination />
    </div>
  );
}
