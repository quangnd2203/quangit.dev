'use client';

import { useState, useEffect } from 'react';
import { SECTION_IDS } from '@/shared/constants';

type SectionId = (typeof SECTION_IDS)[keyof typeof SECTION_IDS];

const SECTION_ORDER: SectionId[] = [
  SECTION_IDS.home,
  SECTION_IDS.skills,
  SECTION_IDS.experience,
  SECTION_IDS.projects,
  SECTION_IDS.contact,
];

const OFFSET = 120;

export const useActiveSection = () => {
  const [activeId, setActiveId] = useState<SectionId | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      let current: SectionId | null = null;
      for (let i = SECTION_ORDER.length - 1; i >= 0; i--) {
        const id = SECTION_ORDER[i];
        const el = document.getElementById(id);
        if (!el) continue;
        const { top } = el.getBoundingClientRect();
        if (top <= OFFSET) {
          current = id;
          break;
        }
      }
      setActiveId(current);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return activeId;
};
