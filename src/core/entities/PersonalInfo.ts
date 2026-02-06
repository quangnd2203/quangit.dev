export interface PersonalInfo {
    id: string; // Unique identifier
    name: string; // Full name
    title: string; // Job title
    description: string; // Professional summary
    highlights: string[]; // Key highlights/achievements
    avatarUrl?: string; // Profile picture URL
    resumeUrl?: string; // CV/Resume download link
    contact: {
        email: string;
        phone: string;
        github?: string;
        website?: string;
        linkedin?: string;
        twitter?: string;
    };
    location?: string; // Location (optional)
    yearsOfExperience?: number; // Total years of experience
}
