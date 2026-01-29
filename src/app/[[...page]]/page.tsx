'use client';

import { useEffect } from 'react';
import { notFound, useParams, usePathname, useRouter } from 'next/navigation';
import { HomeSection } from '@/features/home';
import { SkillsSection } from '@/features/skills';
import { ExperienceSection } from '@/features/experience';
import { ProjectsSection } from '@/features/projects';
import { ContactSection } from '@/features/contact';
import { Header, Footer } from '@/shared/components/layout';
import NotFound from '../not-found';
import { SECTION_IDS } from '@/shared/constants';

const CatchAllPage = () => {
  const params = useParams();

  const slug = params?.page as string[] | undefined;
  const target = slug?.[0];
  const validTargets = Object.values(SECTION_IDS) as string[];

  if (target && !validTargets.includes(target)) {
    return <NotFound />;
  }

  useEffect(() => {
    if (!target) return;
  
    const timer = window.setTimeout(() => {
      const el = document.getElementById(target);
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 500);
  
    return () => window.clearTimeout(timer);
  }, [target]);

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <HomeSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
};

export default CatchAllPage;
