export interface ProjectImage {
  url: string;                          // Image URL
  alt?: string;                          // Alt text for accessibility
  caption?: string;                     // Image caption (optional)
  order?: number;                        // Display order
}

export interface Project {
  id: string;                          // Unique identifier
  title: string;                        // Project name
  description: string;                  // Short description
  longDescription?: string;             // Detailed description
  technologies: string[];               // Tech stack
  thumbnailUrl?: string;                // Main thumbnail image (for cards/list)
  images?: ProjectImage[];              // Multiple project images (gallery)
  githubUrl?: string;                   // GitHub repository link
  demoUrl?: string;                     // Live demo link
  achievements?: string[];              // Key achievements/results
  metrics?: {                           // Performance metrics
    label: string;                      // Metric name (e.g., "Speed Improvement")
    value: string;                      // Metric value (e.g., "6x faster")
  }[];
  category?: string;                    // Project category (optional)
  featured?: boolean;                   // Featured project flag
  startDate?: string;                   // Project start date
  endDate?: string;                     // Project end date
}
