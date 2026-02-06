import { BlogPost } from '@/core/entities';

export const mockBlogPosts: BlogPost[] = [
    // Example blog posts - can be expanded later
    {
        id: 'sample-post-1',
        title: 'Getting Started with Flutter Clean Architecture',
        excerpt:
            'Learn how to structure your Flutter app using Clean Architecture principles for better maintainability and scalability.',
        content: '# Getting Started with Flutter Clean Architecture\n\nContent here...',
        publishedAt: '2024-01-15T00:00:00Z',
        author: 'Nguyen Dang Quang',
        tags: ['flutter', 'architecture', 'clean-architecture'],
        category: 'Mobile Development',
        readingTime: 5,
        featured: true,
    },
];
