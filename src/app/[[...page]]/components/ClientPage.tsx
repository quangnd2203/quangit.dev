'use client';

import { DataProvider } from "@/shared/context/DataProvider";
import { HomeSection } from "@/features/home";
import { SkillsSection } from "@/features/skills";
import { ExperienceSection } from "@/features/experience";
import { ProjectsSection } from "@/features/projects";
import { ContactSection } from "@/features/contact";
import type { InitialData } from '../page';

interface ClientPageProps {
    initialData: InitialData;
}

const ClientPage = ({ initialData }: ClientPageProps) => {
    return (
        <DataProvider initialData={initialData}>
            <HomeSection />
            <SkillsSection />
            <ExperienceSection />
            <ProjectsSection />
            <ContactSection />
        </DataProvider>
    );
};

export default ClientPage;