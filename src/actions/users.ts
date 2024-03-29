'use server';

import { getUsersPerPage } from '@/lib/db/user';

export async function findPeople(page: number, query: string) {
  const { totalPages, users } = await getUsersPerPage(page, query);

  return { totalPages, users };
}
