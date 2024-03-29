'use server';

import { getUsersPerPage } from '@/lib/db/user';
import { sleep } from '@/lib/utils/sleep';

export async function findPeople(page: number, query: string) {
  await sleep(2000);
  const { totalPages, users } = await getUsersPerPage(page, query);

  return { totalPages, users };
}
