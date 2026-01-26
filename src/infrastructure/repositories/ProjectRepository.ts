import { IProjectRepository } from '@/core/interfaces/IProjectRepository';
import { Project } from '@/core/entities/Project';
import { mockProjects } from '@/shared/data/projects';

export class ProjectRepository implements IProjectRepository {
  async getAll(): Promise<Project[]> {
    // Return mock data
    return Promise.resolve(mockProjects);
  }

  async getById(id: string): Promise<Project | null> {
    const project = mockProjects.find(proj => proj.id === id);
    return Promise.resolve(project || null);
  }

  async getFeatured(): Promise<Project[]> {
    // Return only featured projects
    return Promise.resolve(mockProjects.filter(proj => proj.featured === true));
  }
}
