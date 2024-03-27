'use client';

import { useTrapFocusInsideElement } from '@/hooks/useTrapFocusInsideElement';
import { Cross1Icon } from '@radix-ui/react-icons';
import { motion } from 'framer-motion';
import { useEffect, useMemo, useRef } from 'react';
import Heading from './heading';

type ModalProps = {
  isOpen: boolean;
  children: React.ReactNode;
  heading?: string;
  onIsOpenChange: (isOpen: boolean) => void;
};

export default function Modal({
  isOpen,
  onIsOpenChange,
  children,
  heading,
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  useTrapFocusInsideElement(dialogRef, isOpen);

  const animation = useMemo(
    () => ({
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.3 },
    }),
    [],
  );

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';

    const onEscapeKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onIsOpenChange(false);
      }
    };

    window.addEventListener('keydown', onEscapeKeyPress);

    return () => window.removeEventListener('keydown', onEscapeKeyPress);
  }, [isOpen, onIsOpenChange]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <motion.div
        ref={dialogRef}
        open={isOpen}
        {...animation}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-slate-700 text-slate-100 transition-all duration-1000 w-full max-w-lg max-h-[calc(100vh-64px)] overflow-y-auto"
      >
        <div className="pt-9 px-5 relative">
          {heading && (
            <Heading className="text-center" tag="h2">
              {heading}
            </Heading>
          )}
          <button
            onClick={() => onIsOpenChange(false)}
            className="absolute right-2 top-2 p-3"
          >
            <Cross1Icon height="20" width="20" />
          </button>
        </div>

        <div className="border-t border-slate-500 pt-5 pb-9 px-5">
          {children}
        </div>
      </motion.div>

      <motion.div
        {...animation}
        onClick={() => onIsOpenChange(false)}
        className="fixed top-0 left-0 w-full h-full  bg-slate-900/50 duration-1000"
      ></motion.div>
    </>
  );
}
