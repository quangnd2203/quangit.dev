import { ISkillRepository } from '@/core/interfaces/ISkillRepository';
import { SkillCategory } from '@/core/entities/SkillCategory';
import { mockSkillCategories } from '@/shared/data/skills';

export class SkillRepository implements ISkillRepository {
  async getAllCategories(): Promise<SkillCategory[]> {
    // Return mock data
    return Promise.resolve(mockSkillCategories);
  }

  async getCategoryById(id: string): Promise<SkillCategory | null> {
    const category = mockSkillCategories.find(cat => cat.id === id);
    return Promise.resolve(category || null);
  }
}
