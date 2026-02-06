import { useMemo } from 'react';
import { useContactMessagesAdmin } from './useContactMessagesAdmin';
import { useProjects } from '@/features/projects/hooks/useProjects';
import { useExperience } from '@/features/experience/hooks/useExperience';
import { useSkills } from '@/features/skills/hooks/useSkills';

/**
 * Calculate recent messages count within specified days
 */
const calculateRecentMessages = (messages: any[], days: number): number => {
    const now = new Date();
    const cutoffDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

    return messages.filter((msg) => {
        if (!msg.createdAt) return false;
        const msgDate = new Date(msg.createdAt);
        return msgDate >= cutoffDate;
    }).length;
};

/**
 * Group projects by category
 */
const groupByCategory = (projects: any[]): Record<string, number> => {
    return projects.reduce(
        (acc, project) => {
            const category = project.category || 'Uncategorized';
            acc[category] = (acc[category] || 0) + 1;
            return acc;
        },
        {} as Record<string, number>
    );
};

/**
 * Calculate skills by proficiency level
 */
const calculateSkillsByProficiency = (categories: any[]): Record<string, number> => {
    const proficiencyCounts: Record<string, number> = {
        expert: 0,
        advanced: 0,
        intermediate: 0,
        beginner: 0,
    };

    categories.forEach((category) => {
        category.skills?.forEach((skill: any) => {
            if (skill.proficiency && proficiencyCounts.hasOwnProperty(skill.proficiency)) {
                proficiencyCounts[skill.proficiency]++;
            }
        });
    });

    return proficiencyCounts;
};

/**
 * Calculate total skills count across all categories
 */
const calculateTotalSkills = (categories: any[]): number => {
    return categories.reduce((total, category) => {
        return total + (category.skills?.length || 0);
    }, 0);
};

/**
 * Custom hook to aggregate dashboard statistics
 */
export const useDashboardStats = () => {
    const { allMessages, loading: messagesLoading } = useContactMessagesAdmin();
    const { projects, loading: projectsLoading } = useProjects();
    const { experiences, loading: experiencesLoading } = useExperience();
    const { categories, loading: skillsLoading } = useSkills();

    const stats = useMemo(() => {
        const unreadMessages = allMessages.filter((m) => m.status === 'unread');
        const importantMessages = allMessages.filter((m) => m.isImportant);
        const currentExperiences = experiences.filter((exp) => exp.period?.end === 'Present');
        const featuredProjects = projects.filter((p) => p.featured);

        return {
            contactMessages: {
                total: allMessages.length,
                unread: unreadMessages.length,
                important: importantMessages.length,
                recent7Days: calculateRecentMessages(allMessages, 7),
                recent30Days: calculateRecentMessages(allMessages, 30),
            },
            projects: {
                total: projects.length,
                featured: featuredProjects.length,
                categories: groupByCategory(projects),
            },
            experiences: {
                total: experiences.length,
                current: currentExperiences.length,
            },
            skills: {
                total: calculateTotalSkills(categories),
                categories: categories.length,
                byProficiency: calculateSkillsByProficiency(categories),
            },
        };
    }, [allMessages, projects, experiences, categories]);

    const loading = messagesLoading || projectsLoading || experiencesLoading || skillsLoading;

    return {
        stats,
        loading,
    };
};
