export interface BlogPost {
    id: string; // Unique identifier (slug)
    title: string; // Post title
    excerpt: string; // Short excerpt for preview
    content: string; // Full content (MDX)
    publishedAt: string; // Publication date (ISO format)
    updatedAt?: string; // Last update date (optional)
    author: string; // Author name
    tags: string[]; // Tags for categorization
    category?: string; // Post category (optional)
    imageUrl?: string; // Featured image
    readingTime?: number; // Estimated reading time in minutes
    views?: number; // View count (optional)
    featured?: boolean; // Featured post flag
}
