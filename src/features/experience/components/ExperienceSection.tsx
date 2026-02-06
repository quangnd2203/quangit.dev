'use client';

import { motion } from 'framer-motion';
import { useData } from '@/shared/context/DataProvider';
import { Experience } from '@/core/entities/Experience';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.6,
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

export const ExperienceSection = () => {
    const { experiences, loading, error } = useData().experience;

    if (loading) {
        return (
            <section id="experience" className="py-24 bg-white">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <div className="h-12 bg-gray-200 rounded w-96 mx-auto mb-4 animate-pulse"></div>
                        <div className="h-6 bg-gray-200 rounded w-64 mx-auto animate-pulse"></div>
                    </div>

                    <div className="space-y-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="animate-pulse">
                                <div className="flex items-start justify-between mb-2">
                                    <div className="h-7 bg-gray-200 rounded w-48"></div>
                                    <div className="h-6 bg-gray-200 rounded w-32"></div>
                                </div>
                                <div className="h-6 bg-gray-200 rounded w-64 mb-3"></div>
                                <div className="space-y-2">
                                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (error || experiences.length === 0) {
        return (
            <section id="experience" className="py-24 bg-white">
                <div className="container-custom text-center">
                    <p className="text-red-600 text-lg">{error || 'No experiences found'}</p>
                </div>
            </section>
        );
    }

    return (
        <motion.section
            id="experience"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="py-24 bg-white"
        >
            <div className="container-custom">
                {/* Header */}
                <motion.div variants={headerVariants} className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
                        <span className="bg-linear-to-r from-primary-dark to-primary bg-clip-text text-transparent pb-1">
                            Experience
                        </span>
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                        Professional work history
                    </p>
                </motion.div>

                {/* Experience List */}
                <motion.div variants={containerVariants}>
                    {experiences.map((exp, index) => (
                        <motion.article
                            key={exp.id}
                            variants={itemVariants}
                            className="pb-8 mb-8 border-b border-gray-200 last:border-b-0 last:pb-0 last:mb-0"
                        >
                            {/* Header Row: Company & Period */}
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-2">
                                <h3 className="text-2xl font-bold text-gray-900">{exp.company}</h3>
                                <div className="flex items-center gap-2 shrink-0">
                                    <span className="text-sm md:text-base font-medium text-gray-600">
                                        {exp.period.start} — {exp.period.end}
                                    </span>
                                    {exp.period.end === 'Present' && (
                                        <span className="px-2 py-0.5 text-xs font-semibold bg-green-100 text-green-700 rounded">
                                            Current
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Role & Location */}
                            <div className="flex flex-wrap items-center gap-3 mb-4">
                                <p className="text-lg font-semibold text-primary">{exp.role}</p>
                                {exp.location && (
                                    <span className="text-sm text-gray-500">• {exp.location}</span>
                                )}
                            </div>

                            {/* Achievements */}
                            <ul className="space-y-2 mb-4">
                                {exp.achievements.map((achievement, i) => (
                                    <li key={i} className="flex items-start gap-2 text-gray-700">
                                        <span className="text-primary mt-1.5">•</span>
                                        <span className="flex-1">{achievement}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* Technologies */}
                            {exp.technologies && exp.technologies.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {exp.technologies.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-3 py-1 text-sm font-medium bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </motion.article>
                    ))}
                </motion.div>
            </div>
        </motion.section>
    );
};
