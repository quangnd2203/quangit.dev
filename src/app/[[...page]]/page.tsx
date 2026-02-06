import { notFound } from 'next/navigation';
import { HomeSection } from '@/features/home';
import { SkillsSection } from '@/features/skills';
import { ExperienceSection } from '@/features/experience';
import { ProjectsSection } from '@/features/projects';
import { ContactSection } from '@/features/contact';
import { Header, Footer, ScrollManager } from '@/shared/components/layout';
import NotFound from '../not-found';
import { SECTION_IDS } from '@/shared/constants';
import { getPersonalInfo } from '@/server/api/admin/personal-info';
import { getSkills } from '@/server/api/admin/skills';
import { getExperiences } from '@/server/api/admin/experiences';
import { getProjects } from '@/server/api/admin/projects';

interface PageProps {
    params: {
        page?: string[];
    };
}

const CatchAllPage = async ({ params }: PageProps) => {
    const slug = params?.page;
    const target = slug?.[0];
    const validTargets = Object.values(SECTION_IDS) as string[];

    if (target && !validTargets.includes(target)) {
        return <NotFound />;
    }

    return (
        <>
            <ScrollManager target={target} />
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
