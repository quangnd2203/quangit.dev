import { IBlogPostRepository } from '@/core/interfaces/IBlogPostRepository';
import { BlogPost } from '@/core/entities/BlogPost';
import { mockBlogPosts } from '@/shared/data/blogPosts';

export class BlogPostRepository implements IBlogPostRepository {
    async getAll(): Promise<BlogPost[]> {
        // Return mock data
        return Promise.resolve(mockBlogPosts);
    }

    async getById(id: string): Promise<BlogPost | null> {
        const post = mockBlogPosts.find((p) => p.id === id);
        return Promise.resolve(post || null);
    }

    async getFeatured(): Promise<BlogPost[]> {
        // Return only featured posts
        return Promise.resolve(mockBlogPosts.filter((post) => post.featured === true));
    }

    async getByCategory(category: string): Promise<BlogPost[]> {
        // Filter by category
        return Promise.resolve(mockBlogPosts.filter((post) => post.category === category));
    }

    async getByTag(tag: string): Promise<BlogPost[]> {
        // Filter by tag
        return Promise.resolve(mockBlogPosts.filter((post) => post.tags.includes(tag)));
    }
}
