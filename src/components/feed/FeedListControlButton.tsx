import Button from '@/components/ui/Button';
import Link from 'next/link';
import React from 'react';

type FeedListControlButtonProps = {
  children: React.ReactNode;
  href: string;
};

export default function FeedListControlButton({
  children,
  href,
}: FeedListControlButtonProps) {
  return (
    <Button asChild>
      <Link href={href} scroll={false}>
        {children}
      </Link>
    </Button>
  );
}
