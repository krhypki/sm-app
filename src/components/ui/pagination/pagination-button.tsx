import { PaginationDirection } from '@/lib/types';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import Button from '../button';

type PaginationButtonProps = {
  direction: PaginationDirection;
  page: number;
  url: string;
};

export default function PaginationButton({
  direction,
  page,
  url,
}: PaginationButtonProps) {
  return (
    <Button
      size="sm"
      variant="secondary"
      className={`${direction === 'next' ? 'ml-auto' : ''}`}
      asChild
    >
      <Link href={url}>
        {direction === 'previous' && (
          <>
            <ChevronLeftIcon />
            Page {page}
          </>
        )}
        {direction === 'next' && (
          <>
            Page {page}
            <ChevronRightIcon />
          </>
        )}
      </Link>
    </Button>
  );
}
