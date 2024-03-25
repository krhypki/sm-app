'use client';

import { Cross1Icon } from '@radix-ui/react-icons';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
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
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <dialog
        open={isOpen}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-slate-100 transition-all duration-1000"
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

        <div className="border-t border-slate-300 pt-5 pb-9 px-5">
          {children}
        </div>
      </dialog>

      <div
        onClick={() => onIsOpenChange(false)}
        className="fixed top-0 left-0 w-full h-full  bg-slate-900/50 duration-1000"
      ></div>
    </motion.div>
  );
}
