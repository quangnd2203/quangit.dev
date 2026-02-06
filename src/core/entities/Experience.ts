export interface Experience {
    id: string; // Unique identifier
    company: string; // Company name
    role: string; // Job title/role
    period: {
        start: string; // Start date (format: "YYYY-MM" hoặc "YYYY")
        end: string | 'Present'; // End date hoặc "Present"
    };
    achievements: string[]; // List of achievements/responsibilities
    technologies?: string[]; // Technologies used (optional)
    location?: string; // Location (optional)
}
