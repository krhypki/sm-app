'use client';
import { usePathname } from 'next/navigation';
import PaginationButton from './pagination/PaginationButton';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
};

export default function Pagination({
  currentPage,
  totalPages,
}: PaginationProps) {
  const pathname = usePathname();

  return (
    <div className="flex justify-between w-full">
      {currentPage > 1 && (
        <PaginationButton
          direction="previous"
          page={currentPage - 1}
          url={`${pathname}?page=${currentPage - 1}`}
        />
      )}

      {currentPage < totalPages && (
        <PaginationButton
          direction="next"
          page={currentPage + 1}
          url={`${pathname}?page=${currentPage + 1}`}
        />
      )}
    </div>
  );
}
