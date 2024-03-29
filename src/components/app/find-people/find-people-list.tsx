'use client';

import Spinner from '@/components/ui/spinner';
import { useFindPeopleContext } from '@/hooks/contexts';
import UsersList from '../users/UsersList';
import FindPeoplePagination from './find-people-pagination';

export default function FindPeopleList() {
  const { users, isLoading } = useFindPeopleContext();

  if (isLoading) {
    return (
      <div className="flex justify-center pt-10">
        <Spinner variant="dark" />;
      </div>
    );
  }

  return (
    <div>
      {!!users.length && <UsersList users={users} />}

      {!users.length && (
        <p className="text-center text-2xl font-semibold">No users found</p>
      )}

      <FindPeoplePagination />
    </div>
  );
}
