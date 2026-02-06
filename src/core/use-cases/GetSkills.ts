import { ISkillRepository } from '../interfaces/ISkillRepository';
import { SkillCategory } from '../entities/SkillCategory';

export class GetSkills {
    constructor(private skillRepository: ISkillRepository) {}

    async execute(): Promise<SkillCategory[]> {
        const categories = await this.skillRepository.getAllCategories();

        // Business logic: Sort categories by order, then sort skills within each category
        return categories
            .sort((a, b) => (a.order || 0) - (b.order || 0))
            .map((category) => ({
                ...category,
                skills: category.skills.sort((a, b) => {
                    // 1. Sort by proficiency (expert first)
                    const proficiencyOrder = {
                        expert: 4,
                        advanced: 3,
                        intermediate: 2,
                        beginner: 1,
                    };
                    const aProf = proficiencyOrder[a.proficiency || 'beginner'];
                    const bProf = proficiencyOrder[b.proficiency || 'beginner'];

                    if (aProf !== bProf) {
                        return bProf - aProf;
                    }

                    // 2. Sort by priority (lower number first)
                    const aPriority = a.priority ?? 999;
                    const bPriority = b.priority ?? 999;

                    if (aPriority !== bPriority) {
                        return aPriority - bPriority;
                    }

                    // 3. Sort alphabetically
                    return a.name.localeCompare(b.name);
                }),
            }));
    }
}
