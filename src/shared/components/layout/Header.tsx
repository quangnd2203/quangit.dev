'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Navigation } from './Navigation';
import { SECTION_IDS } from '@/shared/constants';
import { useScrollPosition } from '@/shared/hooks';
import { cn } from '@/shared/utils/cn';

export const Header = () => {
  const scrolled = useScrollPosition(20);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={cn(
        'sticky top-0 z-50 w-full border-b bg-white/90 backdrop-blur-md supports-backdrop-filter:bg-white/80 transition-shadow duration-300',
        scrolled
          ? 'border-gray-200/80 shadow-sm'
          : 'border-transparent shadow-none'
      )}
    >
      <div className="container-custom h-14 md:h-16 flex items-center justify-between">
        <Link
          href={`#${SECTION_IDS.home}`}
          className={cn(
            'text-xl font-bold tracking-tight transition-all duration-300',
            'bg-linear-to-r from-primary-dark to-primary bg-clip-text text-transparent',
            'hover:scale-105 hover:opacity-90 active:scale-100'
          )}
        >
          NDQ
        </Link>
        <Navigation />
      </div>
    </motion.header>
  );
};
