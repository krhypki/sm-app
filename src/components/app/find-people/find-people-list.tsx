'use client';

import { useFindPeopleContext } from '@/hooks/contexts';
import Link from 'next/link';
import Button from '../../ui/button';
import Pagination from '../../ui/pagination/pagination';
import UsersList from '../users/UsersList';

export default function FindPeopleList() {
  const { users, currentPage, totalPages } = useFindPeopleContext();
  return (
    <div>
      {!!users.length && <UsersList users={users} />}

      {!users.length && (
        <p className="text-center text-2xl font-semibold">No users found</p>
      )}

      <div className="max-w-[500px] mx-auto mt-16 text-center">
        {currentPage <= totalPages && (
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        )}

        {!!(currentPage > totalPages && currentPage > 1) && (
          <Button asChild>
            <Link href="/app/find-people">Move to the first page</Link>
          </Button>
        )}
      </div>
    </div>
  );
}
