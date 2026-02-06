
import { Header, Footer, ScrollManager } from '@/shared/components/layout';
import NotFound from '../not-found';
import { SECTION_IDS } from '@/shared/constants';
import ClientPage from './components/ClientPage';

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

    return (
        <>
            <ScrollManager target={target} />
            <Header />
            <main className="min-h-screen">
                <ClientPage />
            </main>
            <Footer />
        </>
    );
};

export default Page;
