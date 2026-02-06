'use client';

import { motion } from 'framer-motion';
import { useProjects } from '../hooks/useProjects';
import { useProjectModal } from '../hooks/useProjectModal';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';

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

const cardVariants = {
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

import { Project } from '@/core/entities/Project';

interface ProjectsSectionProps {
    initialData?: Project[] | null;
}

export const ProjectsSection = ({ initialData }: ProjectsSectionProps) => {
    const { projects, loading, error } = useProjects(initialData || undefined);
    const { selectedProject, isOpen, openModal, closeModal } = useProjectModal();

    if (loading) {
        return (
            <section id="projects" className="py-24 bg-gray-50">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <div className="h-12 bg-gray-200 rounded w-64 mx-auto mb-4 animate-pulse" />
                        <div className="h-6 bg-gray-200 rounded w-96 mx-auto animate-pulse" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="animate-pulse">
                                <div className="h-48 bg-gray-200 rounded-t-lg" />
                                <div className="p-5 bg-white border border-t-0 border-gray-200 rounded-b-lg">
                                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
                                    <div className="h-4 bg-gray-200 rounded w-full mb-1" />
                                    <div className="h-4 bg-gray-200 rounded w-5/6 mb-4" />
                                    <div className="flex flex-wrap gap-2">
                                        <div className="h-7 bg-gray-200 rounded w-16" />
                                        <div className="h-7 bg-gray-200 rounded w-20" />
                                        <div className="h-7 bg-gray-200 rounded w-14" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (error || projects.length === 0) {
        return (
            <section id="projects" className="py-24 bg-gray-50">
                <div className="container-custom text-center">
                    <p className="text-red-600 text-lg">{error || 'No projects found'}</p>
                </div>
            </section>
        );
    }

    return (
        <>
            <motion.section
                id="projects"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                className="py-24 bg-gray-50"
            >
                <div className="container-custom">
                    <motion.div variants={headerVariants} className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
                            <span className="bg-linear-to-r from-primary-dark to-primary bg-clip-text text-transparent pb-1">
                                Projects
                            </span>
                        </h2>
                        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                            Selected work and side projects
                        </p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {projects.map((project) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                onClick={() => openModal(project)}
                                variants={cardVariants}
                            />
                        ))}
                    </motion.div>
                </div>
            </motion.section>

            <ProjectModal project={selectedProject} isOpen={isOpen} onClose={closeModal} />
        </>
    );
};
