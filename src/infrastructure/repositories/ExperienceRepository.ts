import { IExperienceRepository } from '@/core/interfaces/IExperienceRepository';
import { Experience } from '@/core/entities/Experience';
import { mockExperiences } from '@/shared/data/experiences';

export class ExperienceRepository implements IExperienceRepository {
  async getAll(): Promise<Experience[]> {
    // Return mock data
    return Promise.resolve(mockExperiences);
  }

  async getById(id: string): Promise<Experience | null> {
    const experience = mockExperiences.find(exp => exp.id === id);
    return Promise.resolve(experience || null);
  }
}
