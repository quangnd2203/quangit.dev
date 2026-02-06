'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useDashboardStats } from '../hooks/useDashboardStats';
import { RecentActivity } from './RecentActivity';
import { QuickActions } from './QuickActions';
import { DashboardInsights } from './DashboardInsights';

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

export const Dashboard = () => {
    const { stats, loading } = useDashboardStats();

    const enhancedStats = [
        {
            id: 'contact-messages',
            label: 'Contact Messages',
            value: loading ? '...' : stats.contactMessages.total.toString(),
            subValue: `${stats.contactMessages.unread} unread`,
            icon: '📧',
            color: 'from-cyan-500 to-blue-600',
            href: '/admin/contact-messages',
            badge: stats.contactMessages.unread > 0 ? stats.contactMessages.unread : undefined,
        },
        {
            id: 'projects',
            label: 'Projects',
            value: loading ? '...' : stats.projects.total.toString(),
            subValue: `${stats.projects.featured} featured`,
            icon: '🚀',
            color: 'from-blue-500 to-purple-600',
            href: '/admin/projects',
        },
        {
            id: 'experiences',
            label: 'Experiences',
            value: loading ? '...' : stats.experiences.total.toString(),
            subValue: `${stats.experiences.current} current`,
            icon: '💼',
            color: 'from-green-500 to-emerald-600',
            href: '/admin/experiences',
        },
        {
            id: 'skills',
            label: 'Skills',
            value: loading ? '...' : stats.skills.total.toString(),
            subValue: `${stats.skills.categories} categories`,
            icon: '🛠️',
            color: 'from-purple-500 to-pink-600',
            href: '/admin/skills',
        },
        {
            id: 'unread-messages',
            label: 'Unread',
            value: loading ? '...' : stats.contactMessages.unread.toString(),
            subValue: 'Unread messages',
            icon: '📬',
            color: 'from-cyan-500 to-blue-600',
            href: '/admin/contact-messages?status=unread',
        },
        {
            id: 'important-messages',
            label: 'Important',
            value: loading ? '...' : stats.contactMessages.important.toString(),
            subValue: 'Important messages',
            icon: '⭐',
            color: 'from-yellow-500 to-orange-600',
            href: '/admin/contact-messages?important=important',
        },
        {
            id: 'recent-messages',
            label: 'Recent (7d)',
            value: loading ? '...' : stats.contactMessages.recent7Days.toString(),
            subValue: 'Last 7 days',
            icon: '📅',
            color: 'from-indigo-500 to-blue-600',
            href: '/admin/contact-messages',
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

            {/* Enhanced Stats Overview */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8"
            >
                {enhancedStats.map((stat) => (
                    <motion.div
                        key={stat.id}
                        variants={itemVariants}
                        whileHover={{ y: -4, scale: 1.02 }}
                    >
                        <Link
                            href={stat.href}
                            className="block bg-white rounded-xl p-5 shadow-sm border border-gray-200 hover:shadow-lg transition-all group"
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div
                                    className={`text-2xl p-2 rounded-lg bg-linear-to-br ${stat.color} text-white group-hover:scale-110 transition-transform`}
                                >
                                    {stat.icon}
                                </div>
                                {stat.badge && (
                                    <span className="inline-flex items-center justify-center min-w-[24px] h-6 px-1.5 text-xs font-bold text-white bg-red-500 rounded-full">
                                        {stat.badge}
                                    </span>
                                )}
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                                <p className="text-xs text-gray-600 mt-1 font-medium">
                                    {stat.label}
                                </p>
                                <p className="text-xs text-gray-500 mt-0.5">{stat.subValue}</p>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </motion.div>

            {/* Recent Activity & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <RecentActivity />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <QuickActions />
                </motion.div>
            </div>

            {/* Insights & Metrics */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
            >
                <DashboardInsights />
            </motion.div>
        </div>
    );
};
