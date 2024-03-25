'use client';

import { useRef } from 'react';

type CollapseProps = {
  isOpen: boolean;
  children: React.ReactNode;
};

export default function Collapse({ isOpen, children }: CollapseProps) {
  const collapseRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={collapseRef}
      className="h-0 overflow-hidden transition-all duration-300"
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
