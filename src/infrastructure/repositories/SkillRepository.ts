import { ISkillRepository } from '@/core/interfaces/ISkillRepository';
import { SkillCategory } from '@/core/entities/SkillCategory';

export class SkillRepository implements ISkillRepository {
    async getAllCategories(): Promise<SkillCategory[]> {
        try {
            const response = await fetch('/api/admin/skills');

            if (!response.ok) {
                throw new Error('Failed to fetch skills');
            }

            const data = await response.json();
            return data || [];
        } catch (error) {
            console.error('Error fetching skills:', error);
            return [];
        }
    }

    async getCategoryById(id: string): Promise<SkillCategory | null> {
        try {
            const categories = await this.getAllCategories();
            return categories.find((cat) => cat.id === id) || null;
        } catch (error) {
            console.error('Error fetching category by id:', error);
            return null;
        }
    }
}
