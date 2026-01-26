import { IExperienceRepository } from '../interfaces/IExperienceRepository';
import { Experience } from '../entities/Experience';

export class GetExperiences {
  constructor(
    private experienceRepository: IExperienceRepository
  ) {}

  async execute(): Promise<Experience[]> {
    // 1. Fetch data từ repository
    const rawData = await this.experienceRepository.getAll();
    
    // 2. Business logic: Sort by date (Present jobs first, then latest first)
    const sorted = rawData.sort((a, b) => {
      if (a.period.end === 'Present' && b.period.end !== 'Present') return -1;
      if (a.period.end !== 'Present' && b.period.end === 'Present') return 1;
      
      const aEnd = a.period.end === 'Present' ? new Date() : new Date(a.period.end);
      const bEnd = b.period.end === 'Present' ? new Date() : new Date(b.period.end);
      return bEnd.getTime() - aEnd.getTime();
    });
    
    return sorted;
  }
}
