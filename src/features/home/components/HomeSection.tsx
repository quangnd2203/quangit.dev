'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useHome } from '../hooks/useHome';
import { cn } from '@/shared/utils/cn';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.8,
            staggerChildren: 0.15,
            delayChildren: 0.2,
        },
    },
};

const leftColumnVariants = {
    hidden: { opacity: 0, y: 40, x: -20 },
    visible: {
        opacity: 1,
        y: 0,
        x: 0,
        transition: {
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

const rightColumnVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -5 },
    visible: {
        opacity: 1,
        scale: 1,
        rotate: 0,
        transition: {
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

const badgeVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4 },
    },
};

const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
};

import { PersonalInfo } from '@/core/entities/PersonalInfo';

interface HomeSectionProps {
    initialData?: PersonalInfo | null;
}

export const HomeSection = ({ initialData }: HomeSectionProps) => {
    const { personalInfo, loading, error } = useHome(initialData);

    if (loading) {
        return (
            <section
                id="home"
                className="min-h-[80vh] flex items-center justify-center bg-linear-to-br from-white via-blue-50/20 to-indigo-50/30 relative overflow-hidden"
            >
                <div className="container-custom py-24">
                    <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-12 lg:gap-16 xl:gap-20 items-center">
                        <div className="order-2 lg:order-1 space-y-6 animate-pulse">
                            <div className="h-14 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                            <div className="h-24 bg-gray-200 rounded w-full"></div>
                            <div className="flex flex-wrap gap-3">
                                <div className="h-9 bg-gray-200 rounded-full w-32"></div>
                                <div className="h-9 bg-gray-200 rounded-full w-40"></div>
                                <div className="h-9 bg-gray-200 rounded-full w-36"></div>
                                <div className="h-9 bg-gray-200 rounded-full w-44"></div>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                            <div className="w-64 h-72 md:w-80 md:h-88 lg:w-96 lg:h-112 bg-gray-200 rounded-[50%]"></div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (error || !personalInfo) {
        return (
            <section
                id="home"
                className="min-h-[80vh] flex items-center justify-center bg-linear-to-br from-white via-blue-50/20 to-indigo-50/30"
            >
                <div className="container-custom text-center">
                    <p className="text-red-600 text-lg">{error || 'Failed to load information'}</p>
                </div>
            </section>
        );
    }

    return (
        <motion.section
            id="home"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="min-h-[80vh] flex items-center bg-linear-to-br from-white via-blue-50/20 to-indigo-50/30 relative overflow-hidden"
        >
            {/* Background Decorative Elements */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl -z-10"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10"></div>

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px] -z-10 opacity-40"></div>

            <div className="container-custom py-24">
                <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-12 lg:gap-16 xl:gap-20 items-center">
                    {/* Left Column - Text Content */}
                    <motion.div
                        variants={leftColumnVariants}
                        className="order-2 lg:order-1 text-left space-y-6 max-w-2xl"
                    >
                        {/* Name with Gradient */}
                        <h1 className="text-5xl md:text-6xl lg:text-6xl font-extrabold tracking-tight mb-2 pb-1 bg-linear-to-r from-primary-dark to-primary bg-clip-text text-transparent">
                            {personalInfo.name}
                        </h1>

                        {/* Title */}
                        <p className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-800 mb-6">
                            {personalInfo.title}
                        </p>

                        {/* Description */}
                        <div
                            className="text-base md:text-lg text-gray-700 leading-loose mb-8 max-w-2xl prose"
                            dangerouslySetInnerHTML={{ __html: personalInfo.description }}
                        />

                        {/* Highlights Badges */}
                        <motion.div
                            variants={{
                                hidden: { opacity: 0 },
                                visible: {
                                    opacity: 1,
                                    transition: { staggerChildren: 0.1 },
                                },
                            }}
                            className="flex flex-wrap gap-3 mb-8"
                        >
                            {personalInfo.highlights.map((highlight, index) => (
                                <motion.span
                                    key={index}
                                    variants={badgeVariants}
                                    className="px-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-sm hover:shadow-md hover:border-primary/30 hover:bg-white text-sm font-medium text-gray-800 rounded-full transition-all duration-300"
                                >
                                    {highlight}
                                </motion.span>
                            ))}
                        </motion.div>

                        {/* CTA Buttons */}
                        <motion.div
                            variants={{
                                hidden: { opacity: 0 },
                                visible: {
                                    opacity: 1,
                                    transition: { staggerChildren: 0.1, delay: 0.3 },
                                },
                            }}
                            className="flex flex-col sm:flex-row gap-4"
                        >
                            {/* Contact Me - Primary */}
                            <motion.button
                                variants={badgeVariants}
                                onClick={() => scrollToSection('contact')}
                                className={cn(
                                    'px-8 py-4 rounded-lg text-base font-semibold transition-all duration-300',
                                    'bg-linear-to-r from-primary to-primary-dark text-white',
                                    'shadow-lg hover:shadow-xl hover:scale-105 active:scale-95',
                                    'flex items-center justify-center gap-2'
                                )}
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    />
                                </svg>
                                Contact Me
                            </motion.button>

                            {/* View Projects - Secondary */}
                            <motion.button
                                variants={badgeVariants}
                                onClick={() => scrollToSection('projects')}
                                className={cn(
                                    'px-8 py-4 rounded-lg text-base font-semibold transition-all duration-300',
                                    'bg-white border-2 border-gray-200 text-gray-900 shadow-sm hover:shadow-md',
                                    'hover:border-primary/30 hover:scale-105 active:scale-95',
                                    'flex items-center justify-center gap-2'
                                )}
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                                    />
                                </svg>
                                View Projects
                            </motion.button>

                            {/* Download CV - Outline */}
                            <motion.button
                                variants={badgeVariants}
                                onClick={() =>
                                    window.open(
                                        personalInfo.resumeUrl ||
                                            `https://${personalInfo.contact.website}`,
                                        '_blank'
                                    )
                                }
                                className={cn(
                                    'px-8 py-4 rounded-lg text-base font-semibold transition-all duration-300',
                                    'border-2 border-gray-300 bg-white text-gray-700 shadow-sm hover:shadow-md',
                                    'hover:border-primary hover:text-primary hover:scale-105 active:scale-95',
                                    'flex items-center justify-center gap-2'
                                )}
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                </svg>
                                Download CV
                            </motion.button>
                        </motion.div>
                    </motion.div>

                    {/* Right Column - Avatar */}
                    <motion.div
                        variants={rightColumnVariants}
                        className="order-1 lg:order-2 flex justify-center lg:justify-end"
                    >
                        <div className="relative">
                            {/* Decorative ring */}
                            <div className="absolute inset-0 rounded-[35%] bg-linear-to-br from-primary/20 to-accent/20 blur-2xl -z-10 scale-110"></div>

                            {/* Image with enhanced shadow */}
                            <div className="relative w-64 h-72 md:w-80 md:h-88 lg:w-120 lg:h-150">
                                <Image
                                    src="/hero/hero_image.png"
                                    alt={personalInfo.name}
                                    fill
                                    priority
                                    sizes="(max-width: 768px) 256px, (max-width: 1024px) 320px, 384px"
                                    className="rounded-[35%] border-4 border-white shadow-2xl object-cover ring-4 ring-primary/20"
                                />
                            </div>

                            {/* Floating decorative elements */}
                            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-xl"></div>
                            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/10 rounded-full blur-xl"></div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
};
