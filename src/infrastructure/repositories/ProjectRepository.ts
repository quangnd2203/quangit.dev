import { IProjectRepository } from '@/core/interfaces/IProjectRepository';
import { Project } from '@/core/entities/Project';

export class ProjectRepository implements IProjectRepository {
  async getAll(): Promise<Project[]> {
    try {
      const response = await fetch('/api/admin/projects');
      
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      
      const data = await response.json();
      return data || [];
    } catch (error) {
      console.error('Error fetching projects:', error);
      return [];
    }
  }

  async getById(id: string): Promise<Project | null> {
    try {
      const projects = await this.getAll();
      return projects.find(proj => proj.id === id) || null;
    } catch (error) {
      console.error('Error fetching project by id:', error);
      return null;
    }
  }

  async getFeatured(): Promise<Project[]> {
    try {
      const projects = await this.getAll();
      return projects.filter(proj => proj.featured === true);
    } catch (error) {
      console.error('Error fetching featured projects:', error);
      return [];
    }
  }
}
