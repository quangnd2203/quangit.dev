/** Section IDs matching app/page.tsx — used for nav links and smooth scroll */
export const SECTION_IDS = {
  home: 'home',
  experience: 'experience',
  skills: 'skills',
  projects: 'projects',
  contact: 'contact',
} as const;

export type SectionId = (typeof SECTION_IDS)[keyof typeof SECTION_IDS];

export const NAV_LINKS: { label: string; href: `/${string}` }[] = [
  { label: 'Skills', href: '/skills' },
  { label: 'Experience', href: '/experience' },
  { label: 'Projects', href: '/projects' },
  { label: 'Contact', href: '/contact' },
];
