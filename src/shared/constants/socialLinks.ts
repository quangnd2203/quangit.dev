/** Social link config — aligns with PersonalInfo.contact */
export interface SocialLink {
  label: string;
  href: string;
  icon: 'github' | 'website' | 'email';
}

export const SOCIAL_LINKS: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/quangnd2203', icon: 'github' },
  { label: 'Website', href: 'https://quangit.dev', icon: 'website' },
  {
    label: 'Email',
    href: 'mailto:quangnd22398.dev@gmail.com',
    icon: 'email',
  },
];
