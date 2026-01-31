export type AssetType = 'image' | 'video';

export interface ProjectAsset {
  type?: AssetType;                     // 'image' or 'video' (optional for backward compatibility)
  url: string;                          // Google Drive URL
  alt?: string;                         // Alt text for accessibility
  caption?: string;                     // Caption/description
  order?: number;                       // Display order
  thumbnailUrl?: string;                // Video thumbnail (auto from Google Drive)
}

// Keep old interface name for backward compatibility
export interface ProjectImage extends ProjectAsset {}

export interface Project {
  id: string;                          // Unique identifier
  title: string;                        // Project name
  description: string;                  // Short description
  longDescription?: string;             // Detailed description
  technologies: string[];               // Tech stack
  thumbnailUrl?: string;                // Main thumbnail image (for cards/list)
  images?: ProjectAsset[];              // Multiple project assets (images/videos)
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
