import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';

export const metadata: Metadata = {
    title: 'Nguyen Dang Quang - Mobile Engineer Portfolio',
    description:
        'Portfolio of Nguyen Dang Quang - Mobile Engineer with 5+ years of experience specializing in Flutter and iOS development',
    keywords: ['Mobile Engineer', 'Flutter', 'iOS', 'React Native', 'Portfolio'],
    authors: [{ name: 'Nguyen Dang Quang' }],
    creator: 'Nguyen Dang Quang',
    openGraph: {
        title: 'Nguyen Dang Quang - Mobile Engineer',
        description: 'Portfolio of Nguyen Dang Quang - Mobile Engineer with 5+ years of experience',
        type: 'website',
        locale: 'en_US',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Nguyen Dang Quang - Mobile Engineer',
        description: 'Portfolio of Nguyen Dang Quang - Mobile Engineer',
    },
    robots: {
        index: true,
        follow: true,
    },
};

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
});

const RootLayout = ({ children }: { children: React.ReactNode }) => (
    <html lang="en">
        <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
);

export default RootLayout;
