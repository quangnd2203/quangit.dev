import { IBlogPostRepository } from '../interfaces/IBlogPostRepository';
import { BlogPost } from '../entities/BlogPost';

export class GetBlogPosts {
    constructor(private blogPostRepository: IBlogPostRepository) {}

    async execute(): Promise<BlogPost[]> {
        const posts = await this.blogPostRepository.getAll();

        // Business logic: Sort by publishedAt (latest first)
        return posts.sort((a, b) => {
            return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
        });
    }

    async getFeatured(): Promise<BlogPost[]> {
        return await this.blogPostRepository.getFeatured();
    }

    async getByCategory(category: string): Promise<BlogPost[]> {
        return await this.blogPostRepository.getByCategory(category);
    }

    async getByTag(tag: string): Promise<BlogPost[]> {
        return await this.blogPostRepository.getByTag(tag);
    }
}
