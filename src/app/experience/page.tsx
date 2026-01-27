'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { HomeSection } from '@/features/home';

const SkillsSection = dynamic(
  () => import('@/features/skills').then((m) => ({ default: m.SkillsSection })),
  { ssr: true }
);

const ExperienceSection = dynamic(
  () => import('@/features/experience').then((m) => ({ default: m.ExperienceSection })),
  { ssr: true }
);

const ProjectsSection = dynamic(
  () => import('@/features/projects').then((m) => ({ default: m.ProjectsSection })),
  { ssr: true }
);

const ContactSection = dynamic(
  () => import('@/features/contact').then((m) => ({ default: m.ContactSection })),
  { ssr: true }
);

const ExperiencePage = () => {
  useEffect(() => {
    // Scroll to experience section after content loads
    setTimeout(() => {
      const element = document.getElementById('experience');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }, []);

  return (
    <main className="min-h-screen">
      <HomeSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  );
};

export default ExperiencePage;
