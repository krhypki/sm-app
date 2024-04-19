import Button from '@/components/ui/Button';
import Pagination from '@/components/ui/Pagination';
import { useFindPeopleContext } from '@/hooks/contexts';
import Link from 'next/link';

export default function FindPeoplePagination() {
  const { currentPage, totalPages } = useFindPeopleContext();
  return (
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
  );
}
