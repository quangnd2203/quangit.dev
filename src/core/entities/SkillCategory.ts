import { Skill } from './Skill';

export interface SkillCategory {
    id: string; // Unique identifier
    name: string; // Category name
    icon?: string; // Category icon
    skills: Skill[]; // Skills in this category
    order?: number; // Display order
}
