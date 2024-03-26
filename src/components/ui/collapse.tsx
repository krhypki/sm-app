'use client';

import { cn } from '@/lib/utils/cn';
import { useRef } from 'react';

type CollapseProps = {
  isOpen?: boolean;
  children: React.ReactNode;
  className?: string;
};

export default function Collapse({
  isOpen,
  children,
  className,
}: CollapseProps) {
  const collapseRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={collapseRef}
      className={cn(
        'h-0 overflow-hidden transition-all duration-300',
        className,
      )}
      style={
        isOpen
          ? { height: collapseRef.current?.scrollHeight + 'px' }
          : { height: '0px' }
      }
    >
      {children}
    </div>
  );
}
