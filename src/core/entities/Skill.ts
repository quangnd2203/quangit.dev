export interface Skill {
    id: string; // Unique identifier
    name: string; // Skill name (e.g., "Flutter", "Swift")
    icon?: string; // Icon URL hoặc icon name
    proficiency?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
    categoryId: string; // Reference to SkillCategory
    priority?: number; // Display priority (lower = higher priority)
}
