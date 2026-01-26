import { IContactRepository } from '@/core/interfaces/IContactRepository';
import { ContactMessage } from '@/core/entities/ContactMessage';

// In-memory storage for contact messages (for development)
// In production, this would connect to a database or API
const contactMessagesStorage: ContactMessage[] = [];

export class ContactRepository implements IContactRepository {
  async create(message: ContactMessage): Promise<ContactMessage> {
    // Generate ID if not provided
    const messageWithId: ContactMessage = {
      ...message,
      id: message.id || `contact-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: message.createdAt || new Date().toISOString(),
      status: message.status || 'pending'
    };

    // Store in memory (in production, save to database)
    contactMessagesStorage.push(messageWithId);

    return Promise.resolve(messageWithId);
  }

  async getById(id: string): Promise<ContactMessage | null> {
    const message = contactMessagesStorage.find(msg => msg.id === id);
    return Promise.resolve(message || null);
  }
}
