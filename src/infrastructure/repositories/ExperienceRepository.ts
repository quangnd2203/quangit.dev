import { IExperienceRepository } from '@/core/interfaces/IExperienceRepository';
import { Experience } from '@/core/entities/Experience';

export class ExperienceRepository implements IExperienceRepository {
  async getAll(): Promise<Experience[]> {
    try {
      const response = await fetch('/api/admin/experiences');
      
      if (!response.ok) {
        throw new Error('Failed to fetch experiences');
      }
      
      const data = await response.json();
      return data || [];
    } catch (error) {
      console.error('Error fetching experiences:', error);
      return [];
    }
  }

  async getById(id: string): Promise<Experience | null> {
    try {
      const experiences = await this.getAll();
      return experiences.find(exp => exp.id === id) || null;
    } catch (error) {
      console.error('Error fetching experience by id:', error);
      return null;
    }
  }
}
