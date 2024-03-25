import { PaginationDirection } from '@/lib/types';
import PaginationButton from './pagination-button';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (direction: PaginationDirection) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="flex justify-between w-full">
      {currentPage > 1 && (
        <PaginationButton
          direction="previous"
          onClick={() => onPageChange('previous')}
          page={currentPage - 1}
        />
      )}

      {currentPage < totalPages && (
        <PaginationButton
          direction="next"
          onClick={() => onPageChange('next')}
          page={currentPage + 1}
        />
      )}
    </div>
  );
}
