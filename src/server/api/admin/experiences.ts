import { Experience } from '@/core/entities/Experience';
import { readJsonFile, writeJsonFile } from '@/server/data/redisStorage';

// Redis key
const EXPERIENCES_KEY = 'experiences';

/**
 * Get experiences
 */
export const getExperiences = async (): Promise<Experience[] | null> => {
    try {
        const data = await readJsonFile<Experience[]>(EXPERIENCES_KEY);
        return data;
    } catch (error) {
        console.error('Error getting experiences:', error);
        throw new Error('Failed to get experiences');
    }
};

/**
 * Update experiences
 */
export const updateExperiences = async (data: Experience[]): Promise<Experience[]> => {
    try {
        // Validate required fields
        for (const experience of data) {
            if (!experience.id || !experience.company || !experience.role) {
                throw new Error('Experience id, company, and role are required');
            }

            if (!experience.period?.start || !experience.period?.end) {
                throw new Error('Experience period start and end are required');
            }

            if (experience.period.end !== 'Present' && typeof experience.period.end !== 'string') {
                throw new Error('Experience period end must be a string or "Present"');
            }

            if (!Array.isArray(experience.achievements) || experience.achievements.length === 0) {
                throw new Error('Experience achievements must be a non-empty array');
            }

            for (const achievement of experience.achievements) {
                if (typeof achievement !== 'string' || achievement.trim() === '') {
                    throw new Error('All achievements must be non-empty strings');
                }
            }

            if (experience.technologies && !Array.isArray(experience.technologies)) {
                throw new Error('Experience technologies must be an array');
            }

            if (experience.technologies) {
                for (const tech of experience.technologies) {
                    if (typeof tech !== 'string' || tech.trim() === '') {
                        throw new Error('All technologies must be non-empty strings');
                    }
                }
            }
        }

        // Write to Redis
        await writeJsonFile(EXPERIENCES_KEY, data);

        return data;
    } catch (error) {
        console.error('Error updating experiences:', error);
        throw error instanceof Error ? error : new Error('Failed to update experiences');
    }
};
