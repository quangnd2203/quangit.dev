'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS } from '@/shared/constants';
import { useActiveSection } from '@/shared/hooks';
import { cn } from '@/shared/utils/cn';

export const Navigation = () => {
  const [open, setOpen] = useState(false);
  const activeId = useActiveSection();

  return (
    <nav className="flex items-center gap-8">
      <div className="hidden md:flex items-center gap-4">
        {NAV_LINKS.map(({ label, href }) => {
          const sectionId = href.slice(1); // Remove leading /
          const isActive = activeId === sectionId;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'relative px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200',
                'text-gray-600 hover:text-primary',
                isActive && 'text-primary',
                'group'
              )}
            >
              {label}
              <span
                className={cn(
                  'absolute bottom-1 left-3 right-3 h-0.5 rounded-full bg-primary transition-all duration-300 origin-left',
                  isActive ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'
                )}
              />
            </Link>
          );
        })}
      </div>

      <button
        type="button"
        aria-expanded={open}
        aria-label="Toggle menu"
        className={cn(
          'md:hidden p-2.5 rounded-xl transition-all duration-200',
          'text-gray-600 hover:text-primary hover:bg-gray-100 active:scale-95'
        )}
        onClick={() => setOpen((v) => !v)}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden
        >
          {open ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="absolute top-full left-0 right-0 bg-white/98 backdrop-blur-md border-b border-gray-200 md:hidden overflow-hidden shadow-lg z-50"
          >
            <div className="container-custom py-4 flex flex-col gap-1">
              {NAV_LINKS.map(({ label, href }) => {
                const sectionId = href.slice(1); // Remove leading /
                const isActive = activeId === sectionId;
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'px-4 py-3 rounded-lg text-gray-700 font-medium transition-all duration-200',
                      'hover:text-primary hover:bg-gray-50',
                      isActive && 'text-primary bg-blue-50/50'
                    )}
                  >
                    {label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
