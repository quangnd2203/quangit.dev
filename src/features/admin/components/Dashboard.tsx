'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useProjects } from '@/features/projects/hooks/useProjects';
import { useExperience } from '@/features/experience/hooks/useExperience';
import { useSkills } from '@/features/skills/hooks/useSkills';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
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

const quickLinks = [
  {
    id: 'personal-info',
    title: 'Personal Info',
    description: 'Edit personal information',
    href: '/admin/personal-info',
    icon: '👤',
    color: 'from-pink-500 to-pink-600',
  },
  {
    id: 'skills',
    title: 'Skills',
    description: 'Manage technical skills',
    href: '/admin/skills',
    icon: '🛠️',
    color: 'from-purple-500 to-purple-600',
  },
  {
    id: 'experiences',
    title: 'Experiences',
    description: 'Manage work experiences',
    href: '/admin/experiences',
    icon: '💼',
    color: 'from-green-500 to-green-600',
  },
  {
    id: 'projects',
    title: 'Projects',
    description: 'Manage portfolio projects',
    href: '/admin/projects',
    icon: '🚀',
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: 'contact-messages',
    title: 'Contact Messages',
    description: 'View contact messages',
    href: '/admin/contact-messages',
    icon: '📧',
    color: 'from-cyan-500 to-cyan-600',
  },
  {
    id: 'blog',
    title: 'Blog Posts',
    description: 'Manage blog posts',
    href: '/admin/blog',
    icon: '📝',
    color: 'from-orange-500 to-orange-600',
  },
];

export const Dashboard = () => {
  const { projects, loading: projectsLoading } = useProjects();
  const { experiences, loading: experiencesLoading } = useExperience();
  const { categories, loading: skillsLoading } = useSkills();

  const stats = [
    {
      id: 'projects',
      label: 'Total Projects',
      value: projectsLoading ? '...' : projects.length.toString(),
      icon: '🚀',
    },
    {
      id: 'experiences',
      label: 'Work Experiences',
      value: experiencesLoading ? '...' : experiences.length.toString(),
      icon: '💼',
    },
    {
      id: 'skills',
      label: 'Skill Categories',
      value: skillsLoading ? '...' : categories.length.toString(),
      icon: '🛠️',
    },
    {
      id: 'blog',
      label: 'Blog Posts',
      value: '0', // Placeholder - will implement later
      icon: '📝',
    },
  ];

  return (
    <div className="container-custom py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <h1 className="text-4xl font-extrabold mb-2 bg-linear-to-r from-primary-dark to-primary bg-clip-text text-transparent">
          Dashboard
        </h1>
        <p className="text-lg text-gray-600">Welcome to the admin panel</p>
      </motion.div>

      {/* Stats Overview */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
      >
        {stats.map((stat) => (
          <motion.div
            key={stat.id}
            variants={itemVariants}
            whileHover={{ y: -4, scale: 1.02 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl">{stat.icon}</span>
              <div className="text-right">
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Quick Links */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mb-8"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Links</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickLinks.map((link) => (
            <motion.div
              key={link.id}
              variants={itemVariants}
              whileHover={{ y: -4, scale: 1.02 }}
            >
              <Link
                href={link.href}
                className="block bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className={`text-4xl p-3 rounded-lg bg-linear-to-br ${link.color} text-white group-hover:scale-110 transition-transform`}>
                    {link.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-primary transition-colors">
                      {link.title}
                    </h3>
                    <p className="text-sm text-gray-600">{link.description}</p>
                  </div>
                  <svg
                    className="w-5 h-5 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
