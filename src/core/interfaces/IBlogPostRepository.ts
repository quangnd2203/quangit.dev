import { BlogPost } from '../entities/BlogPost';

export interface IBlogPostRepository {
  getAll(): Promise<BlogPost[]>;
  getById(id: string): Promise<BlogPost | null>;
  getFeatured(): Promise<BlogPost[]>;
  getByCategory(category: string): Promise<BlogPost[]>;
  getByTag(tag: string): Promise<BlogPost[]>;
}
