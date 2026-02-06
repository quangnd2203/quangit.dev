import { Project } from '@/core/entities/Project';
import { readJsonFile, writeJsonFile } from '@/server/data/redisStorage';

// Redis key
const PROJECTS_KEY = 'projects';

/**
 * Get projects
 */
export const getProjects = async (): Promise<Project[] | null> => {
    try {
        const data = await readJsonFile<Project[]>(PROJECTS_KEY);
        return data;
    } catch (error) {
        console.error('Error getting projects:', error);
        throw new Error('Failed to get projects');
    }
};

/**
 * Update projects
 */
export const updateProjects = async (data: Project[]): Promise<Project[]> => {
    try {
        // Validate required fields
        for (const project of data) {
            if (!project.id || !project.title || !project.description) {
                throw new Error('Project id, title, and description are required');
            }

            if (!Array.isArray(project.technologies) || project.technologies.length === 0) {
                throw new Error('Project technologies must be a non-empty array');
            }

            for (const tech of project.technologies) {
                if (typeof tech !== 'string' || tech.trim() === '') {
                    throw new Error('All technologies must be non-empty strings');
                }
            }

            if (project.images && !Array.isArray(project.images)) {
                throw new Error('Project images must be an array');
            }

            if (project.images) {
                for (const image of project.images) {
                    if (!image.url || typeof image.url !== 'string') {
                        throw new Error('All images must have a valid URL');
                    }
                }
            }

            if (project.achievements && !Array.isArray(project.achievements)) {
                throw new Error('Project achievements must be an array');
            }

            if (project.achievements) {
                for (const achievement of project.achievements) {
                    if (typeof achievement !== 'string' || achievement.trim() === '') {
                        throw new Error('All achievements must be non-empty strings');
                    }
                }
            }

            if (project.metrics && !Array.isArray(project.metrics)) {
                throw new Error('Project metrics must be an array');
            }

            if (project.metrics) {
                for (const metric of project.metrics) {
                    if (
                        !metric.label ||
                        !metric.value ||
                        typeof metric.label !== 'string' ||
                        typeof metric.value !== 'string'
                    ) {
                        throw new Error('All metrics must have label and value as strings');
                    }
                }
            }

            if (project.featured !== undefined && typeof project.featured !== 'boolean') {
                throw new Error('Featured must be a boolean');
            }
        }

        // Write to Redis
        await writeJsonFile(PROJECTS_KEY, data);

        return data;
    } catch (error) {
        console.error('Error updating projects:', error);
        throw error instanceof Error ? error : new Error('Failed to update projects');
    }
};
