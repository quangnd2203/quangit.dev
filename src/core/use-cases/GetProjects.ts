import { IProjectRepository } from '../interfaces/IProjectRepository';
import { Project } from '../entities/Project';

export class GetProjects {
    constructor(private projectRepository: IProjectRepository) {}

    async execute(): Promise<Project[]> {
        const projects = await this.projectRepository.getAll();

        // Business logic: Featured projects first, then sort by date
        return projects.sort((a, b) => {
            if (a.featured && !b.featured) return -1;
            if (!a.featured && b.featured) return 1;

            // If both have dates, sort by date (latest first)
            if (a.endDate && b.endDate) {
                return new Date(b.endDate).getTime() - new Date(a.endDate).getTime();
            }

            return 0;
        });
    }

    async getFeatured(): Promise<Project[]> {
        return await this.projectRepository.getFeatured();
    }
}
