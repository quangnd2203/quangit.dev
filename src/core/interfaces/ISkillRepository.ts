import { SkillCategory } from '../entities/SkillCategory';

export interface ISkillRepository {
    getAllCategories(): Promise<SkillCategory[]>;
    getCategoryById(id: string): Promise<SkillCategory | null>;
}
