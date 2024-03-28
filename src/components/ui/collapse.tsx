'use client';

import { cn } from '@/lib/utils/cn';
import { useEffect, useRef, useState } from 'react';

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
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setHeight(collapseRef.current?.scrollHeight || 0);
  }, [children]);

  return (
    <div
      ref={collapseRef}
      className={cn(
        'h-0 overflow-hidden transition-all duration-300',
        className,
      )}
      style={isOpen ? { height: height + 'px' } : { height: '0px' }}
    >
      {children}
    </div>
  );
}
