
import { Header, Footer, ScrollManager } from '@/shared/components/layout';
import NotFound from '../not-found';
import { SECTION_IDS } from '@/shared/constants';
import ClientPage from './components/ClientPage';
import type { PersonalInfo } from '@/core/entities/PersonalInfo';
import type { SkillCategory } from '@/core/entities/SkillCategory';
import type { Experience } from '@/core/entities/Experience';
import type { Project } from '@/core/entities/Project';

/**
 * Resolves the base URL for internal API calls from Server Components.
 *
 * @returns Base URL string (e.g., "https://quangit.dev" or "http://localhost:3000")
 */
const getBaseUrl = (): string => {
    if (process.env.NEXT_PUBLIC_BASE_URL) return process.env.NEXT_PUBLIC_BASE_URL;
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
    return `http://localhost:${process.env.PORT || 3000}`;
};

export interface InitialData {
    personalInfo: PersonalInfo | null;
    skills: SkillCategory[];
    experiences: Experience[];
    projects: Project[];
}

/**
 * Fetches all page data in parallel from API routes (server-side).
 * Falls back to null/empty arrays on error so the page still renders.
 *
 * @returns Initial data for all sections
 */
const fetchInitialData = async (): Promise<InitialData> => {
    const baseUrl = getBaseUrl();

    const [personalInfo, skills, experiences, projects] = await Promise.all([
        fetch(`${baseUrl}/api/admin/personal-info`)
            .then((r) => (r.ok ? r.json() : null))
            .catch(() => null) as Promise<PersonalInfo | null>,
        fetch(`${baseUrl}/api/admin/skills`)
            .then((r) => (r.ok ? r.json() : []))
            .catch(() => []) as Promise<SkillCategory[]>,
        fetch(`${baseUrl}/api/admin/experiences`)
            .then((r) => (r.ok ? r.json() : []))
            .catch(() => []) as Promise<Experience[]>,
        fetch(`${baseUrl}/api/admin/projects`)
            .then((r) => (r.ok ? r.json() : []))
            .catch(() => []) as Promise<Project[]>,
    ]);

    return { personalInfo, skills, experiences, projects };
};

interface PageProps {
    params: {
        page?: string[];
    };
}

const Page = async ({ params }: PageProps) => {
    const slug = params?.page;
    const target = slug?.[0];
    const validTargets = Object.values(SECTION_IDS) as string[];

    if (target && !validTargets.includes(target)) {
        return <NotFound />;
    }

    // Server-side fetch: data is available in initial HTML
    const initialData = await fetchInitialData();

    return (
        <>
            <ScrollManager target={target} />
            <Header />
            <main className="min-h-screen">
                <ClientPage initialData={initialData} />
            </main>
            <Footer />
        </>
    );
};

export default Page;
