// Export all repository implementations
export * from './ExperienceRepository';
export * from './ProjectRepository';
export * from './SkillRepository';
export * from './PersonalInfoRepository';
export * from './BlogPostRepository';
export * from './ContactRepository';

// Export singleton instances for easy access
import { ExperienceRepository } from './ExperienceRepository';
import { ProjectRepository } from './ProjectRepository';
import { SkillRepository } from './SkillRepository';
import { PersonalInfoRepository } from './PersonalInfoRepository';
import { BlogPostRepository } from './BlogPostRepository';
import { ContactRepository } from './ContactRepository';

export const experienceRepository = new ExperienceRepository();
export const projectRepository = new ProjectRepository();
export const skillRepository = new SkillRepository();
export const personalInfoRepository = new PersonalInfoRepository();
export const blogPostRepository = new BlogPostRepository();
export const contactRepository = new ContactRepository();
