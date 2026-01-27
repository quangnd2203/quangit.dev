'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { NAV_LINKS, SOCIAL_LINKS } from '@/shared/constants';

const currentYear = new Date().getFullYear();

const SocialIcon = ({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: 'github' | 'website' | 'email';
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-gray-600 transition-all duration-300 hover:bg-primary hover:text-white hover:scale-110 active:scale-95 border border-gray-200/80 shadow-sm"
  >
    {icon === 'github' && (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path
          fillRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          clipRule="evenodd"
        />
      </svg>
    )}
    {icon === 'website' && (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
        />
      </svg>
    )}
    {icon === 'email' && (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    )}
  </a>
);

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

export const Footer = () => {
  // Logo link: always go to homepage root
  const getLogoHref = () => {
    return '/';
  };

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.4 }}
      className="border-t border-gray-200/80 bg-linear-to-b from-[#f9fafb] to-[#f3f4f6]"
    >
      <div className="container-custom pt-16 pb-0">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12"
        >
          {/* Brand */}
          <motion.div variants={item} className="md:col-span-1">
            <Link
              href={getLogoHref()}
              className="inline-block text-2xl font-bold tracking-tight bg-linear-to-r from-primary-dark to-primary bg-clip-text text-transparent transition-opacity hover:opacity-90"
            >
              NDQ
            </Link>
          <p className="mt-2 text-lg font-semibold text-gray-900">Nguyen Dang Quang</p>
          <p className="mt-2 text-sm text-gray-500">Mobile Engineer</p>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-gray-600">
            Flutter & iOS · 5+ years · Building polished mobile experiences.
          </p>
        </motion.div>

        {/* Quick links */}
        <motion.div variants={item}>
          <h1 className="text-md font-semibold uppercase text-gray-500">Quick links</h1>
          <ul className="mt-5 flex flex-col gap-2">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-gray-600 transition-colors hover:text-primary"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Social */}
        <motion.div variants={item}>
          <h1 className="text-md font-semibold uppercase tracking-wider text-gray-500">Connect</h1>
          <div className="mt-5 flex gap-2">
            {SOCIAL_LINKS.map(({ label, href, icon }) => (
              <SocialIcon key={href} href={href} label={label} icon={icon} />
            ))}
          </div>
        </motion.div>
      </motion.div>

      <div className="py-6 mt-8 md:mt-12 border-t border-gray-200/80">
        <p className="text-center text-sm text-gray-500">
          © {currentYear} Nguyen Dang Quang. All rights reserved.
        </p>
      </div>
    </div>
  </motion.footer>
  );
};
