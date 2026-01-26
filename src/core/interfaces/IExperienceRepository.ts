import { Experience } from '../entities/Experience';

export interface IExperienceRepository {
  getAll(): Promise<Experience[]>;
  getById(id: string): Promise<Experience | null>;
}
