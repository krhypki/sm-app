'use client';

import { motion } from 'framer-motion';

type MotionBorderProps = {
  layoutId?: string;
};

export default function MotionBorder({ layoutId }: MotionBorderProps) {
  return (
    <motion.div
      className="bg-accent h-1 w-full absolute bottom-0"
      layoutId={layoutId}
    />
  );
}
