'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useDashboardStats } from '../hooks/useDashboardStats';
import { useProjects } from '@/features/projects/hooks/useProjects';

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

export const DashboardInsights = () => {
    const { stats, loading } = useDashboardStats();
    const { projects } = useProjects();

    const contactTrends = useMemo(() => {
        const recent7Days = stats.contactMessages.recent7Days;
        const recent30Days = stats.contactMessages.recent30Days;
        const previous7Days = recent30Days - recent7Days;
        const trend =
            previous7Days > 0
                ? (((recent7Days - previous7Days) / previous7Days) * 100).toFixed(1)
                : recent7Days > 0
                  ? '100'
                  : '0';

        const responseRate =
            stats.contactMessages.total > 0
                ? (
                      ((stats.contactMessages.total - stats.contactMessages.unread) /
                          stats.contactMessages.total) *
                      100
                  ).toFixed(1)
                : '0';

        return {
            recent7Days,
            previous7Days,
            trend: parseFloat(trend),
            responseRate: parseFloat(responseRate),
        };
    }, [stats]);

    const portfolioOverview = useMemo(() => {
        const featuredPercentage =
            stats.projects.total > 0
                ? ((stats.projects.featured / stats.projects.total) * 100).toFixed(1)
                : '0';

        // Get most used technologies from projects
        const techCounts: Record<string, number> = {};
        projects.forEach((project) => {
            project.technologies?.forEach((tech) => {
                techCounts[tech] = (techCounts[tech] || 0) + 1;
            });
        });
        const topTechnologies = Object.entries(techCounts)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 5);

        const topCategories = Object.entries(stats.projects.categories)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 3);

        return {
            featuredPercentage: parseFloat(featuredPercentage),
            topCategories,
            topTechnologies,
        };
    }, [stats, projects]);

    const skillsDistribution = useMemo(() => {
        const { byProficiency } = stats.skills;
        const total = stats.skills.total;

        if (total === 0) {
            return {
                expert: 0,
                advanced: 0,
                intermediate: 0,
                beginner: 0,
            };
        }

        return {
            expert: ((byProficiency.expert / total) * 100).toFixed(1),
            advanced: ((byProficiency.advanced / total) * 100).toFixed(1),
            intermediate: ((byProficiency.intermediate / total) * 100).toFixed(1),
            beginner: ((byProficiency.beginner / total) * 100).toFixed(1),
        };
    }, [stats]);

    if (loading) {
        return (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Insights & Metrics</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="animate-pulse">
                            <div className="h-24 bg-gray-200 rounded-lg"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Insights & Metrics</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Contact Messages Trends */}
                <motion.div
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    className="p-4 bg-linear-to-br from-blue-50 to-cyan-50 rounded-lg border border-blue-100"
                >
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Contact Trends</h3>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-600">Last 7 days</span>
                            <span className="text-lg font-bold text-gray-900">
                                {contactTrends.recent7Days}
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-600">Previous 7 days</span>
                            <span className="text-sm font-medium text-gray-700">
                                {contactTrends.previous7Days}
                            </span>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t border-blue-200">
                            <span className="text-xs text-gray-600">Response Rate</span>
                            <span className="text-sm font-semibold text-blue-600">
                                {contactTrends.responseRate}%
                            </span>
                        </div>
                        {contactTrends.trend !== 0 && (
                            <div className="flex items-center gap-1 pt-1">
                                <span
                                    className={`text-xs font-medium ${contactTrends.trend > 0 ? 'text-green-600' : 'text-red-600'}`}
                                >
                                    {contactTrends.trend > 0 ? '↑' : '↓'}{' '}
                                    {Math.abs(contactTrends.trend)}%
                                </span>
                                <span className="text-xs text-gray-500">vs previous period</span>
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Portfolio Overview */}
                <motion.div
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.1 }}
                    className="p-4 bg-linear-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-100"
                >
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Portfolio Overview</h3>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-600">Featured Projects</span>
                            <span className="text-lg font-bold text-gray-900">
                                {stats.projects.featured}
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-600">Featured %</span>
                            <span className="text-sm font-semibold text-purple-600">
                                {portfolioOverview.featuredPercentage}%
                            </span>
                        </div>
                        {portfolioOverview.topCategories.length > 0 && (
                            <div className="pt-2 border-t border-purple-200">
                                <p className="text-xs text-gray-600 mb-2">Top Categories</p>
                                <div className="space-y-1">
                                    {portfolioOverview.topCategories.map(([category, count]) => (
                                        <div
                                            key={category}
                                            className="flex items-center justify-between"
                                        >
                                            <span className="text-xs text-gray-700 truncate">
                                                {category}
                                            </span>
                                            <span className="text-xs font-medium text-gray-900">
                                                {count}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {portfolioOverview.topTechnologies.length > 0 && (
                            <div className="pt-2 border-t border-purple-200">
                                <p className="text-xs text-gray-600 mb-2">Top Technologies</p>
                                <div className="space-y-1">
                                    {portfolioOverview.topTechnologies
                                        .slice(0, 3)
                                        .map(([tech, count]) => (
                                            <div
                                                key={tech}
                                                className="flex items-center justify-between"
                                            >
                                                <span className="text-xs text-gray-700 truncate">
                                                    {tech}
                                                </span>
                                                <span className="text-xs font-medium text-gray-900">
                                                    {count}
                                                </span>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Skills Distribution */}
                <motion.div
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.2 }}
                    className="p-4 bg-linear-to-br from-orange-50 to-yellow-50 rounded-lg border border-orange-100"
                >
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">
                        Skills Distribution
                    </h3>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-600">Total Skills</span>
                            <span className="text-lg font-bold text-gray-900">
                                {stats.skills.total}
                            </span>
                        </div>
                        <div className="pt-2 border-t border-orange-200 space-y-1.5">
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-700">Expert</span>
                                <span className="text-xs font-semibold text-blue-600">
                                    {skillsDistribution.expert}%
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-700">Advanced</span>
                                <span className="text-xs font-semibold text-purple-600">
                                    {skillsDistribution.advanced}%
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-700">Intermediate</span>
                                <span className="text-xs font-semibold text-green-600">
                                    {skillsDistribution.intermediate}%
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-700">Beginner</span>
                                <span className="text-xs font-semibold text-gray-600">
                                    {skillsDistribution.beginner}%
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
