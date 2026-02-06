import { SkillCategory } from '@/core/entities/SkillCategory';
import { readJsonFile, writeJsonFile } from '@/server/data/redisStorage';

// Redis key
const SKILLS_KEY = 'skills';

/**
 * Get skills (categories with skills)
 */
export const getSkills = async (): Promise<SkillCategory[] | null> => {
    try {
        const data = await readJsonFile<SkillCategory[]>(SKILLS_KEY);
        return data;
    } catch (error) {
        console.error('Error getting skills:', error);
        throw new Error('Failed to get skills');
    }
};

/**
 * Update skills (categories with skills)
 */
export const updateSkills = async (data: SkillCategory[]): Promise<SkillCategory[]> => {
    try {
        // Validate required fields
        for (const category of data) {
            if (!category.id || !category.name) {
                throw new Error('Category id and name are required');
            }

            if (!Array.isArray(category.skills)) {
                throw new Error('Category skills must be an array');
            }

            for (const skill of category.skills) {
                if (!skill.id || !skill.name || !skill.categoryId) {
                    throw new Error('Skill id, name, and categoryId are required');
                }

                if (skill.categoryId !== category.id) {
                    throw new Error(
                        `Skill categoryId (${skill.categoryId}) must match category id (${category.id})`
                    );
                }

                if (
                    skill.proficiency &&
                    !['beginner', 'intermediate', 'advanced', 'expert'].includes(skill.proficiency)
                ) {
                    throw new Error(`Invalid proficiency: ${skill.proficiency}`);
                }

                if (skill.priority !== undefined && skill.priority < 0) {
                    throw new Error('Priority must be >= 0');
                }
            }
        }

        // Write to Redis
        await writeJsonFile(SKILLS_KEY, data);

        return data;
    } catch (error) {
        console.error('Error updating skills:', error);
        throw error instanceof Error ? error : new Error('Failed to update skills');
    }
};
