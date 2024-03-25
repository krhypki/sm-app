import { PaginationDirection } from '@/lib/types';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import Button from '../button';

type PaginationButtonProps = {
  direction: PaginationDirection;
  page: number;
  onClick: () => void;
};

export default function PaginationButton({
  direction,
  onClick,
  page,
}: PaginationButtonProps) {
  return (
    <Button
      size="sm"
      variant="secondary"
      className={`${direction === 'next' ? 'ml-auto' : ''}`}
      onClick={onClick}
    >
      {direction === 'previous' && (
        <>
          <ChevronLeftIcon />
          {page}
        </>
      )}

      {direction === 'next' && (
        <>
          {page}
          <ChevronRightIcon />
        </>
      )}
    </Button>
  );
}
